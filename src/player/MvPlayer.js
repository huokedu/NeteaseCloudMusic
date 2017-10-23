/**
 * Copyright 2017-present, chenghao.
 * All rights reserved.
 *
 * 视频播放器
 * Created by SEELE on 2017/10/12
 *
 */
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { tools } from '../utils';
import { setPlayVideo } from '../redux/actions';
import { connect } from 'react-redux';

class MvPlayer extends PureComponent {
    state = {
        videoUrl: '',
    };
    componentWillReceiveProps(nextProps) {
        const { currentPlayVideo } = this.props;
        const nextCurrentPlayVideo = nextProps.currentPlayVideo;
        if (currentPlayVideo.fullScreen !== nextCurrentPlayVideo.fullScreen) { // 获取新的播放地址
            this.player.presentFullscreenPlayer();
        }
    }
    onLoad = obj => {
        this.props.dispatch(setPlayVideo({duration: obj.duration, totalTime: tools.transTime(obj.duration), playing: true}));
    };
    onProgress = time => {
        const { duration } = this.props.currentPlayVideo;
        this.props.dispatch(setPlayVideo({currentTime: tools.transTime(time.currentTime), sliderProgress: time.currentTime / duration}));
    };
    render() {
        const { videoUrl, currentPlayVideo } = this.props;
        return (
            <Video
                source={{uri: videoUrl, type: 'mp4'}}   // Can be a URL or a local file.
                ref={(ref) => {
                    this.player = ref
                }}                                      // Store reference
                rate={1.0}                              // 0 is paused, 1 is normal.
                volume={1.0}                            // 0 is muted, 1 is normal.
                muted={false}                           // Mutes the audio entirely.
                paused={!currentPlayVideo.playing}                          // Pauses playback entirely.
                resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                repeat={false}                           // Repeat forever.
                playInBackground               // Audio continues to play when app entering background.
                playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                // onLoadStart={this.loadStart}            // Callback when video starts to load
                onLoad={this.onLoad}               // Callback when video loads
                onProgress={this.onProgress}               // Callback every ~250ms with currentTime
                // onEnd={this.onEnd}                      // Callback when playback finishes
                // onError={this.videoError}               // Callback when video cannot be loaded
                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                // onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                style={[{height: 200}, this.props.style]}
            />
        )
    }
}

const mapStateToProps = ({currentPlayVideo}) => ({
    currentPlayVideo
});

export default connect(mapStateToProps)(MvPlayer);