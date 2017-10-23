/**
 * Created by 叶子 on 2017/9/14.
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Animated, Easing, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import { TextTool, Separator, ModalMenu, MenuRow } from '../widgets';
import { screen, color } from '../utils';
import { connect } from 'react-redux';
import { setPlayId, setPlaySong } from '../redux/actions';
import { SONG_DETAIL, SONG_LYRIC } from '../api';

const { Normal, Tip, H3 } = TextTool;

class PlayerScene extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        header: <View style={{width: 0, height: 0}} />,
        // headerTitle: (
        //     <View style={{justifyContent: 'space-between'}}>
        //         <Normal title="Chandelier" />
        //         <Tip title="Sia" />
        //     </View>
        // ),
        // headerRight: <Icon name="ios-redo-outline" size={25} style={{marginRight: 10}} />
    });
    constructor () {
        super();
        this.state = {
            detail: {},
            lyric: '',
            lyricArr: [],
            currentLrc: '',     // 当前歌词
            showLyic: false,
            lyricScroll: 0      // 初始歌词滚动条位置
        };
        this.animatedValue = new Animated.Value(0);
        this.animatedTop = new Animated.Value(0);
    }
    componentDidMount() {
        // this.props.dispatch(setPlayId('28068843'))
        const { currentPlayId } = this.props;
        this.songDetail(currentPlayId);
        this.songLyric(currentPlayId);
    }
    componentWillReceiveProps(nextProps) {
        const { currentPlay } = this.props;
        const nextCurrentPlay = nextProps.currentPlay;
        const { lyric, lyricArr } = this.state;
        if (currentPlay.currentTime !== nextCurrentPlay.currentTime) {
            if (lyric) {    // 匹配当前歌词，并且逐行上滑
                console.log(lyric.match(new RegExp(`\\[${nextCurrentPlay.currentTime}\\.\\d+\\].*`, 'g')));
                const currentLrc = lyric.match(new RegExp(`\\[${nextCurrentPlay.currentTime}\\.\\d+\\].*`, 'g'));
                if (currentLrc) {
                    this.setState({currentLrc: currentLrc[0]});
                    this.setState({
                        lyricScroll: this.state.lyricScroll += 20,
                    }, () => this.lyricScroll && this.lyricScroll.scrollTo({x: 0, y: lyricArr.findIndex(v => v === currentLrc[0]) * 20, animated: true}))
                }
            }
        }
    }
    circling = () => {
        this.animatedValue.setValue(0);
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 12000,
            easing: Easing.linear
        }).start(() => this.circling());
    };
    topAnimate = (start = 0, end = 1) => {
        this.animatedTop.setValue(start);
        Animated.timing(this.animatedTop, {
            toValue: end,
            duration: 150,
            easing: Easing.linear
        }).start();
    };
    goBack = () => {
        const backAction = NavigationActions.back();
        console.log(backAction);
        this.props.navigation.goBack();
    };
    test = () => {
        this.props.dispatch(setPlayId('186003'))
    };
    songDetail = id => {
        try {
            (
                async () => {
                    // 详情
                    const res = await fetch(SONG_DETAIL + id);
                    const detail = (await res.json()).songs[0];
                    console.log(detail);
                    // 歌词
                    // const lyRes = await fetch(SONG_LYRIC + id);
                    // const lyric = (await lyRes.json()).lrc.lyric;
                    // const lyricArr = lyric.split(/\n/).map(v => v.replace(/\[.*\]/g, ''));
                    this.setState({
                        detail,
                        // lyric,
                        // lyricArr
                    });
                    this.props.navigation.setParams({name: detail.name, artists: detail.ar.map(v => v.name).join('、')});
                    this.circling();    // 旋转图片
                }
            )();
        } catch (err) {
            alert(err);
        }
    };
    songLyric = id => {
        try {
            (
                async () => {
                    // 歌词
                    const lyRes = await fetch(SONG_LYRIC + id);
                    const lyric = (await lyRes.json()).lrc.lyric;
                    const lyricArr = lyric.split(/\n/);
                    this.setState({
                        lyric,
                        lyricArr
                    });
                }
            )();
        } catch (err) {
            alert(err);
        }
    };
    sliderChange = value => {
        const { currentPlay, dispatch } = this.props;
        dispatch(setPlaySong({sliderProgress: value, ff: currentPlay.duration * value}));
        // alert(value);
    };
    showLyric = () => {
        this.setState({
            showLyic: !this.state.showLyic
        })
    };
    playing = playing => {
        this.props.dispatch(setPlaySong({playing}));
    };
    render() {
        const interpolatedAnimation = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        const topAnimation = this.animatedTop.interpolate({
            inputRange: [0, 1],
            outputRange: [screen.height, 0]
        });
        const modalMenus = [
            {leftIcon: 'folder-plus', title: '收藏到歌单'},
            {leftIcon: 'music-note', title: '相似推荐'},
            {leftIcon: 'account', title: '歌手：周杰伦'},
            {leftIcon: 'album', title: '专辑：JAY'},
            {leftIcon: 'link-variant', title: '来源：JAY'},
            {leftIcon: 'music-circle', title: '音质', subTitle: '开通会员畅想更高音质'},
            {leftIcon: 'clock', title: '定时关闭'},
            {leftIcon: 'car', title: '打开驾驶模式'},
        ];
        console.log(this.props.currentPlay);
        const { detail, currentLrc, showLyic, lyricArr } = this.state;
        const { params } = this.props.navigation.state;
        const { currentPlay } = this.props;
        return (
            <View style={styles.container}>
                <Image style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 1, opacity: 0.8}} blurRadius={8} source={{uri: detail.al && detail.al.picUrl + '?param=200y200'}} />
                {/*<View style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 2, opacity: 0.3, backgroundColor: '#9e9e9e'}} />*/}
                <View style={{zIndex: 5, flex: 1}}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={this.goBack}>
                            <Icon name="ios-arrow-back-outline" size={25} color={color.white} />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <Normal color={color.white}>{params.name}</Normal>
                            <Tip color={color.white} style={{fontSize: 9}}>{params.artists}</Tip>
                        </View>
                        <TouchableOpacity onPress={this.test}>
                            <Icon name="ios-redo-outline" size={25} color={color.white} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.cdContainer} onPress={this.showLyric}>
                        {
                            showLyic ? (
                                <View style={styles.cdContainer}>
                                    <ScrollView style={{width: screen.width}} contentContainerStyle={{alignItems: 'center', paddingTop: '30%', paddingBottom: '30%'}} ref={lyricScroll => this.lyricScroll = lyricScroll}>
                                        {
                                            lyricArr.map((v, i) => (
                                                <Normal color={v === currentLrc ? color.theme : color.white} key={i} style={{paddingTop: 5, paddingBottom: 5}}>{v.replace(/\[.*\]/g, '')}</Normal>
                                            ))
                                        }
                                    </ScrollView>

                                </View>
                            ) : (
                                <View style={styles.cdContainer}>
                                    <View style={{position: 'absolute', top: 0, left: 34, width: screen.width, alignItems: 'center', zIndex: 18}}>
                                        <Image source={require('../imgs/img/needle-ip6.png')} style={{width: 100, height: 140}}/>
                                    </View>
                                    <Image source={require('../imgs/img/disc-ip6.png')} style={{width: screen.width - 40, height: screen.width - 40, justifyContent: 'center', alignItems: 'center'}}>
                                        <Animated.Image
                                            source={{uri: detail.al && detail.al.picUrl + '?param=200y200'}}
                                            style={[{width: screen.width - 152, height: screen.width - 152, borderRadius: (screen.width - 152) / 2}, {transform: [
                                                {rotate: interpolatedAnimation},
                                            ]}]}
                                        />
                                    </Image>
                                </View>
                            )
                        }
                    </TouchableOpacity>
                    <View style={styles.topBtn}>
                        <TouchableOpacity onPress={() => this.lyricScroll.scrollTo({x: 0, y: 10, animated: true})}>
                            <Icon name="ios-heart-outline" size={25} color={color.white} />
                        </TouchableOpacity>
                        <Icon name="ios-cloud-download-outline" size={25} color={color.white} />
                        <Icon name="ios-chatbubbles-outline" size={25} color={color.white} />
                        <TouchableOpacity onPress={() => this.modalMenu.topAnimate(0, 1)}><Icon name="md-more" size={25} color={color.white} /></TouchableOpacity>
                    </View>
                    <View style={styles.sliderBtn}>
                        <Tip style={{width: 35}} color={color.white}>{currentPlay.currentTime}</Tip>
                        <Slider
                            maximumTrackTintColor={color.white}
                            minimumTrackTintColor={color.theme}
                            thumbStyle={styles.thumb}
                            trackStyle={{height: 2}}
                            style={{width: screen.width - 100}}
                            value={currentPlay.sliderProgress}
                            onValueChange={value => this.sliderChange(value)}
                        />
                        <Tip style={{width: 35}} color="#ffffff">{currentPlay.playTime}</Tip>
                    </View>
                    <View style={styles.footerBtn}>
                        <Icon name="ios-repeat-outline" size={30} color={color.white} />
                        <Icon name="ios-skip-backward-outline" size={30} color={color.white} />
                        {
                            currentPlay.playing ? (
                                <TouchableOpacity onPress={() => this.playing(false)}>
                                    <Icon name="ios-pause-outline" size={30} color={color.white} />
                                </TouchableOpacity>
                            ) :
                                (
                                    <TouchableOpacity onPress={() => this.playing(true)}>
                                        <Icon name="ios-play-outline" size={30} color={color.white} />
                                    </TouchableOpacity>
                                )
                        }
                        <Icon name="ios-skip-forward-outline" size={30} color={color.white} />
                        <Icon name="ios-list-outline" size={30} color={color.white} />
                    </View>
                </View>
                <ModalMenu ref={modalMenu => this.modalMenu = modalMenu}>
                    <View style={{height: 40, paddingLeft: 8, justifyContent: 'center'}}>
                       <Text style={{fontSize: 12}}>歌曲：测试</Text>
                    </View>
                    <Separator />
                    <ScrollView>
                        {
                            modalMenus.map((v ,i ) => (
                                <MenuRow key={i} leftIcon={v.leftIcon} title={v.title} subTitle={v.subTitle} />
                            ))
                        }
                        <MenuRow />
                    </ScrollView>
                </ModalMenu>
                {/*<Animated.View style={{width: screen.width, height: screen.height, position: 'absolute', zIndex: 5, backgroundColor: 'transparent', top: topAnimation}}>*/}
                    {/*<TouchableWithoutFeedback onPress={() => this.topAnimate(1, 0)}>*/}
                        {/*<View style={{width: screen.width, height: screen.height * 0.4, backgroundColor: '#777777', opacity: 0.7}} />*/}
                    {/*</TouchableWithoutFeedback>*/}
                    {/*<View style={{width: screen.width, height: screen.height * 0.6, backgroundColor: '#ffffff'}}>*/}

                    {/*</View>*/}
                {/*</Animated.View>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    headerContainer: {
        height: 50,
        width: screen.width,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: screen.onePixel,
        borderColor: 'rgba(245, 245, 245, 0.21)'
    },
    cdContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBtn: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    sliderBtn: {
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    thumb: {
        width: 20,
        height: 20,
        backgroundColor: color.theme,
        borderColor: color.white,
        borderWidth: 7,
        borderRadius: 10,
    },
    footerBtn: {
        height: 50,
        width: screen.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});

const mapStateToProps = ({currentPlay}) => ({
    currentPlayId: currentPlay.id,
    currentPlay
});

export default connect(mapStateToProps)(PlayerScene);