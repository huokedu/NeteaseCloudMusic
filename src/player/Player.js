/**
 * Created by 叶子 on 2017/9/14.
 */
import React, { PureComponent } from 'react';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { MUSIC_URL } from '../api';
import { setPlaySong } from '../redux/actions';
import { tools } from '../utils';

class Player extends PureComponent {
    state = {
        musicUrl: ''
    };
    componentWillReceiveProps(nextProps) {
        const { currentPlayId, currentPlay } = this.props;
        const nextPlayId = nextProps.currentPlayId;
        const nextCurrentPlay = nextProps.currentPlay;
        console.log(nextPlayId);
        if (currentPlayId !== nextPlayId) { // 获取新的播放地址
            this.getMusicUrl(nextPlayId);
        }
        if (currentPlay.ff !== nextCurrentPlay.ff) {    // 快进，快退操作
            this.player.seek(nextCurrentPlay.ff)
        }
    }
    getMusicUrl = id => {
        try {
            (async () => {
                const res = await fetch(MUSIC_URL + id);
                const json = await res.json();
                console.log(json.data[0].url);
                this.setState({
                    musicUrl: json.data[0].url
                })
            })();
        } catch(err) {
            alert(err);
        }
    };
    loadStart = () => {};
    setDuration = (obj) => {
        console.log(obj);
        this.props.dispatch(setPlaySong({duration: obj.duration, playTime: tools.transTime(obj.duration), playing: true}));
    };
    setTime = (time) => {
        console.log(time);
        const { duration } = this.props.currentPlay;
        this.props.dispatch(setPlaySong({currentTime: tools.transTime(time.currentTime), sliderProgress: time.currentTime / duration}));
    };
    onEnd = () => {};
    videoError = () => {};
    onBuffer = () => {};
    onTimedMetadata =() => {};
    render() {
        const { musicUrl } = this.state;
        const { currentPlay } = this.props;
        return (
            musicUrl ? (
                <Video
                    source={{uri: musicUrl}}   // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    rate={1.0}                              // 0 is paused, 1 is normal.
                    volume={1.0}                            // 0 is muted, 1 is normal.
                    muted={false}                           // Mutes the audio entirely.
                    paused={!currentPlay.playing}                          // Pauses playback entirely.
                    resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                    repeat={true}                           // Repeat forever.
                    playInBackground               // Audio continues to play when app entering background.
                    playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                    progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                    ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                    onLoadStart={this.loadStart}            // Callback when video starts to load
                    onLoad={this.setDuration}               // Callback when video loads
                    onProgress={this.setTime}               // Callback every ~250ms with currentTime
                    onEnd={this.onEnd}                      // Callback when playback finishes
                    onError={this.videoError}               // Callback when video cannot be loaded
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                    style={{width: 0, height: 0}}
                />
            ) : null
        )

    }
}

const mapStateToProps = ({currentPlay}) => ({
    currentPlayId: currentPlay.id,
    currentPlay

});

export default connect(mapStateToProps)(Player);
