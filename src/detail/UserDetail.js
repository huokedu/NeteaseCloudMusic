/**
 * Created by 叶子 on 2017/8/20.
 */
import React, { PureComponent } from 'react';
import { Text, SectionList, View, Animated, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { screen, color } from '../utils';
import { TextTool, Avatar, PageHeader, ListSectionHeader, MenuRow, EventItem } from '../widgets';
import { USER_DETAIL, USER_PLAYLIST, USER_EVENT } from '../api';

const { H3, H4, Tip, Normal } = TextTool;
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const AnimatedScrollableTabView = Animated.createAnimatedComponent(ScrollableTabView);
const windowHeight = screen.width * 0.7;

class UserDetail extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        header: null
    });
    state = {
        refreshing: true,
        scrollY: new Animated.Value(0),
        data: {},
        profile: {},
        playlist: [],
        playlistOwn: [],
        playlistOthers: [],
        events: []
    };
    componentWillMount() {
        this.fetchProfile();
        this.fetchMusic();
        this.fetchEvent();
    }
    fetchProfile = () => {
        (async () => {
            try {
                const res = await fetch(USER_DETAIL + this.props.navigation.state.params.id);
                const { profile } = await res.json();
                this.setState({profile});
            } catch (err) {
                alert(err)
            }
        })();
    };
    fetchMusic = () => {
        (async () => {
            try {
                const res = await fetch(USER_PLAYLIST + this.props.navigation.state.params.id);
                const data = await res.json();
                const { playlist } = data;
                this.setState({playlist, data});
            } catch (err) {
                alert(err)
            }
        })();
    };
    fetchEvent = () => {
        (async () => {
            try {
                const res = await fetch(USER_EVENT + this.props.navigation.state.params.id);
                const data = await res.json();
                const { events } = data;
                this.setState({events});
            } catch (err) {
                alert(err)
            }
        })();
    };
    toDetail = id => {
        const { navigation } = this.props;
        navigation.navigate('Detail', {title: '歌单', id})
    };
    renderHeader = () => {
        const { profile } = this.state;
        return (
            <Animated.View style={{height: screen.width * 0.7 + 50, backgroundColor: 'transparent', alignItems: 'center', position: 'absolute',
                left: 0,
                top: 50,
                right: 0,
                bottom: 0,
                zIndex: 9,
                width: screen.width,
                opacity: this.state.scrollY.interpolate({
                    inputRange: [-windowHeight, 0, windowHeight / 1.2],
                    outputRange: [1, 1, 0],
                    extrapolate: 'clamp'
                }),
                transform: [{
                    translateY: this.state.scrollY.interpolate({
                        inputRange: [ -windowHeight, 0, windowHeight],
                        outputRange: [windowHeight/2, 0, -50],
                        extrapolate: 'clamp'
                    })
                }]}}
            >
                <Avatar img={{uri: profile.avatarUrl}} />
                <H3 color="#ffffff" style={{marginTop: 5, marginBottom: 5}}>{profile.nickname}</H3>
                <Tip color="#ffffff" style={{marginTop: 5, marginBottom: 5}}>云音乐达人</Tip>
                <Tip color="#ffffff" style={{marginTop: 5, marginBottom: 5}}>关注 {profile.follows} | 粉丝 {profile.followeds}</Tip>
                <View style={{borderWidth: screen.onePixel, borderColor: '#ffffff', borderRadius: 10, width: 80, flexDirection: 'row', alignItems: 'center', height: 20}}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="ios-add-outline" size={15} color="#ffffff" style={{marginLeft: 15}} />
                        <Tip color="#ffffff">关注</Tip>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="ios-mail-outline" size={15} color="#ffffff" style={{marginLeft: 15}} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
        )
    };
    musicSectionHeader = ({section}) => (
        <ListSectionHeader>
            {section.title}
        </ListSectionHeader>
    );
    renderMusicItem = ({item}) => (
        <TouchableOpacity onPress={() => this.toDetail(item.id)}>
            <MenuRow title={item.name} subTitle={`${item.trackCount}首，${this.props.navigation.state.params.id !== item.creator.userId ? `  by ${item.creator.nickname}，` : ''}  播放${item.playCount > 10000 ? (item.playCount / 10000).toFixed(1) + '万' : item.playCount}次`} image={{uri: item.coverImgUrl + '?param=140y140'}} />
        </TouchableOpacity>
    );
    aboutTa = () => {
        const { data, profile } = this.state;
        return (
            <View style={{flex: 1, height: screen.height + windowHeight, paddingVertical: 20, paddingHorizontal: 10}}>
                <View>
                    <Normal>个人信息</Normal>
                    <Tip style={{marginTop: 10}}>等级： {data.level}</Tip>
                    <Tip style={{marginTop: 10}}>性别： {profile.gender === 2 ? '女' : '男'}</Tip>
                    <Tip style={{marginTop: 10}}>年龄： </Tip>
                    <Tip style={{marginTop: 10}}>等级： </Tip>
                </View>
                <View style={{height: 30}} />
                <View>
                    <Normal>个人简介</Normal>
                    <Tip style={{marginTop: 10}}>{profile.signature}</Tip>
                </View>
            </View>
        )
    };
    render() {
        const { scrollY, profile, playlist, events } = this.state;
        const { id } = this.props.navigation.state.params;
        const windowHeight = screen.width * 0.7;
        const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
        const playlistOwn = playlist.filter(v => v.creator.userId === id);
        const playlistOthers = playlist.filter(v => v.creator.userId !== id);
        const musicSections = [
            {key: 1, title: <View style={{flexDirection: 'row'}}><Tip>{`歌单(${playlistOwn.length})`}</Tip><View style={{flex: 1}} /><Tip>共被收藏{profile.playlistBeSubscribedCount}次</Tip></View>, data: playlistOwn},
            {key: 2, title: <Tip>{`收藏的歌单(${playlistOthers.length})`}</Tip>, data: playlistOthers},
        ];
        return (
            <View style={{flex: 1}}>
                <Animated.Image
                    style={{
                        position: 'absolute',
                        backgroundColor: '#2e2f31',
                        width: screen.width,
                        resizeMode: 'cover',
                        height: windowHeight,
                        opacity: scrollY.interpolate({
                            inputRange: [-windowHeight, 0, windowHeight / 1.2],
                            outputRange: [1, 1, 0.4],
                            extrapolate: 'clamp'
                        }),
                        transform: [{
                            translateY: scrollY.interpolate({
                                inputRange: [ -windowHeight, 0, windowHeight],
                                outputRange: [windowHeight/2, 0, -50],
                                extrapolate: 'clamp'
                            })
                        },{
                            scale: scrollY.interpolate({
                                inputRange: [ -windowHeight, 0, windowHeight],
                                outputRange: [2, 1, 1]
                            })
                        }]
                    }}
                    source={{uri: profile.backgroundUrl}}
                />
                <PageHeader />
                {this.renderHeader()}

                <Animated.View style={{flex: 1, top: screen.width * 0.7 - 50, left:0, right: 0, bottom: 0,height: screen.height,
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [ -windowHeight, 0, windowHeight],
                            outputRange: [windowHeight - 50, 0, -windowHeight + 50],
                            extrapolate: 'clamp'
                        }),
                    }],
                    backgroundColor: '#fff',
                    zIndex: 99

                }}
                >
                    <ScrollableTabView
                        style={{flex: 1}}
                        tabBarBackgroundColor="#ffffff"
                        tabBarActiveTextColor="#D43C33"
                        tabBarInactiveTextColor="#000000"
                        tabBarUnderlineStyle={{backgroundColor: '#D43C33'}}
                        renderTabBar={() => <DefaultTabBar  />}
                    >
                        <AnimatedSectionList
                            style={{flex: 1}}
                            sections={musicSections}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderMusicItem}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                                { useNativeDriver: true }
                            )}
                            renderSectionHeader={this.musicSectionHeader}
                            stickySectionHeadersEnabled
                            scrollEventThrottle={26}
                            tabLabel={`音乐 ${playlist.length}`}
                        />
                        <AnimatedSectionList
                            sections={[{key: 1, title: `我创建的歌单`, data: events},]}
                            keyExtractor={(item, index) => index}
                            renderItem={({item}) => (
                                <EventItem data={item} />
                            )}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                                { useNativeDriver: true }
                            )}
                            scrollEventThrottle={16}
                            ItemSeparatorComponent={() => <View style={{width: screen.width, borderWidth: 1, borderColor: color.border}}/>}
                            tabLabel={`动态${events.length}`}
                        />
                        <AnimatedSectionList
                            sections={[{key: 1, title: 'about', data: [1]}]}
                            keyExtractor={(item, index) => index}
                            renderSectionHeader={this.aboutTa}
                            stickySectionHeadersEnabled
                            renderItem={() => <View />}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                                { useNativeDriver: true }
                            )}
                            scrollEventThrottle={16}
                            tabLabel='关于TA'
                        />
                    </ScrollableTabView>
                </Animated.View>
            </View>
        )
    }
}

export default UserDetail;