/**
 * Copyright 2017-present, chenghao.
 * All rights reserved.
 *
 * mv 详情界面
 * Created by SEELE on 2017/10/12
 *
 */
import React, { PureComponent } from 'react';
import { View, Text, SectionList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { TextTool, CommentItem, ListFooter, IconWidget } from '../widgets';
import Icon from 'react-native-vector-icons/Ionicons';
import MvPlayer from '../player/MvPlayer';
import { color, screen } from '../utils';
import { MV_DETIAL, MV_COMMENT } from '../api';
import { connect } from 'react-redux';
import { setPlayVideo } from '../redux/actions';

const { H3, H4, Normal, Tip } = TextTool;

class MvDetail extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });
    state = {
        refreshing: false,
        showVideoIcon: true,
        data: {},
        hotComments: [],
        comments: [],
        offset: 0,
        commentsTotal: 0,
        footerText: '数据加载中'
    };
    componentDidMount() {
        this.showIcon();
        this.fetchData();
        this.fetchComment();
    }
    fetchData = () => {
        const { id } = this.props.navigation.state.params;
        this.setState({refreshing: true});
        (async () => {
            try {
                // 播放和详情
                const res = await fetch(MV_DETIAL + id);
                const data = (await res.json()).data;
                console.log(data);
                this.setState({
                    data,
                    refreshing: false,
                })
            } catch (err) {
                console.log(err);
            }
        })();
    };
    fetchComment = () => {
        const { id } = this.props.navigation.state.params;
        const { offset, comments, hotComments } = this.state;
        this.setState({refreshing: true});
        (async () => {
            try {
                // 评论
                const resC = await fetch(MV_COMMENT + id + `&offset=${offset}`);
                const data = await resC.json();
                this.setState({
                    hotComments: [...hotComments, ...(data.hotComments || [])],
                    comments: [...comments, ...data.comments],
                    offset: offset + 20,
                    commentsTotal: data.total,
                    refreshing: false,
                    footerText: data.comments.length > 0 ? '数据加载中' : '我是有底线的'
                })
            } catch (err) {
                console.log(err)
            }
        })();
    };
    playing = playing => {
        playing ? this.showIcon() : this.showIcon(false);
        this.props.dispatch(setPlayVideo({playing}));
    };
    fullScreenPlay = () => {
        this.props.dispatch(setPlayVideo({fullScreen: true}));
    };
    renderHeader = () => {
        const { data } = this.state;
        return (
            <View style={{flex: 1, backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: color.border}}>
                <View style={{flexDirection: 'row', paddingBottom: 12,}}>
                    <H3>{data.name}</H3>
                    <View style={{flex: 1}} />
                    <Icon name="md-arrow-dropdown" size={25} />
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 12,}}>
                    <Normal color="#0c73c2">歌手：{data.artistName}</Normal>
                </View>
                <View style={{flexDirection: 'row', paddingBottom: 12,}}>
                    <Tip>发行：{data.publishTime}</Tip>
                    <Tip style={{marginHorizontal: 10}}>|</Tip>
                    <Tip>播放：{data.playCount}</Tip>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
                    <IconWidget icon="ios-thumbs-up-outline" title={data.likeCount} />
                    <IconWidget icon="ios-cube-outline" title={data.subCount} />
                    <IconWidget icon="ios-chatboxes-outline" title={data.commentCount} />
                    <IconWidget icon="ios-share-alt-outline" title={data.shareCount} />
                    {/*<View style={{alignItems: 'center'}}>*/}
                        {/*<Icon name="ios-thumbs-up-outline" size={30} />*/}
                        {/*<Tip>{data.likeCount}</Tip>*/}
                    {/*</View>*/}
                </View>
            </View>
        )
    };
    sectionHeader = ({section}) => (
        <View>
            {section.data.length > 0 && (
                <View style={{height: 30, backgroundColor: color.border, paddingLeft: 20, justifyContent: 'center'}}>
                    <Tip>{section.title}({section.title === '最新评论' ? this.state.commentsTotal : section.data.length})</Tip>
                </View>
            )}
        </View>
    );
    renderItem = ({item}) => (
        <CommentItem data={item} />
    );
    showIcon = (close = true) => {
        this.clearTimer();
        this.setState({showVideoIcon: true});
        close && this.hideIcon(3000)
    };
    hideIcon = (time) => {
        this.timer = setTimeout(() => this.setState({showVideoIcon: false}), time);
    };
    clearTimer = () => {
        this.timer && clearTimeout(this.timer);
    };
    componentWillUnmount() {
        this.clearTimer();
    };
    render() {
        // const sections = [{key: 1, data: [1]}];
        const { navigation, currentPlayVideo } = this.props;
        const { showVideoIcon, data, hotComments, comments, refreshing, footerText } = this.state;
        const sections = [
                {key: 1, title: '精彩评论', data: hotComments},
                {key: 2, title: '最新评论', data: comments},
            ];
        return (
            <View style={{flex: 1}}>
                {
                    showVideoIcon && (
                        <View style={{height: 200, position: 'absolute', paddingVertical: 15, backgroundColor: 'transparent', justifyContent: 'space-between', zIndex: 999}}>
                            <View style={{height: 50, width: screen.width, flexDirection: 'row', paddingHorizontal: 10,}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        const backAction = NavigationActions.back();
                                        navigation.dispatch(backAction);
                                    }}
                                >
                                    <Icon name="ios-arrow-back" size={25} color={color.white} />
                                </TouchableOpacity>
                                <View style={{flex: 1}} />
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity style={{marginRight: 10}}>
                                        <Icon name="ios-share-alt-outline" size={25} color={color.white} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icon name="ios-more" size={25} color={color.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                {
                                    currentPlayVideo.playing ? (
                                        <TouchableOpacity onPress={() => this.playing(false)}>
                                            <Icon name="ios-pause-outline" size={40} color={color.white} />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => this.playing(true)}>
                                            <Icon name="ios-play-outline" size={40} color={color.white} />
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                            <View style={{height: 50, width: screen.width, flexDirection: 'row', paddingHorizontal: 10, alignItems: 'flex-end'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Tip color="#ffffff">{currentPlayVideo.currentTime}/{currentPlayVideo.totalTime}</Tip>
                                    <View style={{flex: 1}} />
                                    <TouchableOpacity onPress={this.fullScreenPlay}>
                                        <Icon name="ios-resize-outline" size={25} color={color.white} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }
                <TouchableWithoutFeedback onPress={this.showIcon}>
                    <View>
                        {
                            data.brs && (
                                <MvPlayer videoUrl={data.brs && (data.brs['480'] || data.brs['240'])} />
                            )
                        }

                    </View>
                </TouchableWithoutFeedback>
                <SectionList
                    style={{backgroundColor: '#fff'}}
                    // onRefresh={this.requestData}
                    refreshing={true}
                    keyExtractor={(item, index) => index}
                    sections={sections}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.sectionHeader}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={() => <ListFooter text={footerText} />}
                    stickySectionHeadersEnabled
                    onEndReachedThreshold={1}
                    onEndReached={this.fetchComment}
                />
            </View>

        )
    }
}

const mapStateToProps = ({currentPlayVideo}) => ({
    currentPlayVideo
});

export default connect(mapStateToProps)(MvDetail);

