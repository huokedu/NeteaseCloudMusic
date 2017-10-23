/**
 * Created by 叶子 on 2017/9/6.
 * 详情界面
 */
import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextTool, Avatar, IconWidget } from '../widgets';
import { screen,color } from '../utils';
import { NavigationActions } from 'react-navigation';
import { PLAYLIST_DETAIL, TOP_LIST } from '../api';
import { connect } from 'react-redux';
import { setPlayId } from '../redux/actions';

const { H3, Tip, Normal } = TextTool;

class DetailScene extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        header: null,
        // headerTitle: '歌单',
        // headerStyle:{ position: 'absolute', height: 50, backgroundColor: 'rgba(0, 0, 0, 0.64)', zIndex: 100, top: 0, left: 0, right: 0 }
    });
    state = {
        // dataList: [{title: '致即将逝去的青春', subTitle: '茶几杨 - 暖行'}, {title: '致即将逝去的青春', subTitle: '茶几杨 - 暖行'}],
        dataList: [],
        refreshing: true,
        paused: false,
        data: {creator: {}, tracks: []},
    };
    componentWillMount() {
    }
    componentDidMount() {
        this.requestDetail();
        // this.flatList.scrollToIndex(params => alert(JSON.stringify(params)));
    }
    requestDetail = () => {
        (
            async () => {
                const { id, type = 'playlist' } = this.props.navigation.state.params;
                const url = type === 'playlist' && PLAYLIST_DETAIL || type === 'top' && TOP_LIST;
                const res = await fetch(url + id);
                const { playlist, result} = await res.json();
                const json = playlist || result;
                this.setState({
                    dataList: json.tracks.map(v => ({...v, title: v.name + ((v.alia && v.alia.length > 0) ? `(${v.alia})` : ''), subTitle: (v.ar || v.artists).map(a => a.name).join('、') + ' - ' + (v.al || v.album).name})),
                    refreshing: false,
                    data: json
                });
            }
        )();
    };
    goBack = () => {
        const backAction = NavigationActions.back({key: 'Tab'});
        console.log(backAction);
        this.props.navigation.dispatch(backAction);
    };
    playSong = id => {
        console.log(id);
        const { dispatch, navigation } = this.props;
        dispatch(setPlayId(id));
        navigation.navigate('Player', {title: '播放器'})
    };
    scrollToLocation = (params) => {
        console.log(params)
    };
    toUserPage = id => {
        this.props.navigation.navigate('UserDetail', {id})
    };
    renderHeader = () => {
        const { data } = this.state;
        return (
            <View style={styles.header}>
                <Image source={{uri: data && `${data.coverImgUrl}?param=250y150`}} resizeMode="cover" style={[styles.bg, {top: -50, height: screen.width * 0.6 + 50,}]} blurRadius={4} />
                {/*<View style={{height: 10, width: screen.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent'}}>*/}
                    {/*<TouchableOpacity*/}
                        {/*onPress={() => {*/}
                            {/*const backAction = NavigationActions.back();*/}
                            {/*console.log(backAction);*/}
                            {/*this.props.navigation.dispatch(backAction);*/}
                        {/*}}*/}
                        {/*style={{width: screen.width * 0.25, paddingLeft: 10, backgroundColor: 'transparent'}}*/}
                    {/*>*/}
                        {/*<Icon name="ios-arrow-back" size={25} color={color.white} />*/}
                    {/*</TouchableOpacity>*/}
                    {/*<View style={{justifyContent: 'center', alignItems: 'center', width: screen.width * 0.5}}>*/}
                        {/*<H3 title={ this.props.navigation.state.params.title} style={{color: color['white']}} />*/}
                    {/*</View>*/}
                    {/*<View style={{flexDirection: 'row', justifyContent: 'flex-end', width: screen.width * 0.25, paddingRight: 10}}>*/}
                        {/*<Icon name="ios-more" size={25} style={{marginRight: 10}} color={color.white} />*/}
                        {/*<Icon name="ios-stats" size={25} color={color.white} />*/}
                    {/*</View>*/}
                {/*</View>*/}
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, backgroundColor: 'transparent'}}>
                    <View style={{width: screen.width * 0.3, height: screen.width * 0.3}}>
                        <Image source={{uri: data && `${data.coverImgUrl}?param=250y250`}} style={{width: '100%', height: '100%'}}/>
                    </View>
                    <View style={{flex: 1, marginLeft: 15, height: '80%'}}>
                        <H3 style={{paddingTop: 15, paddingBottom: 10}} color={color.white}>{data.name}</H3>
                        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.toUserPage(data.creator.userId)}>
                            <Avatar img={{uri: `${data.creator.avatarUrl}?param=80y80`}} size={30} />
                            <Normal style={{paddingVertical: 10, paddingHorizontal: 10}} color={color.white}>{data.creator.nickname}  ></Normal>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 50, justifyContent: 'space-around', flexDirection: 'row', backgroundColor: 'transparent', paddingTop: 10, alignItems: 'center'}}>
                    <IconWidget icon="ios-star-outline" color={color.white} title={data.subscribedCount} />
                    <IconWidget icon="ios-chatboxes-outline" color={color.white} title={data.commentCount} />
                    <IconWidget icon="ios-open-outline" color={color.white} title={data.shareCount} />
                    <IconWidget icon="ios-download-outline" color={color.white} title={data.white} />
                    {/*<View style={{alignItems: 'center'}}>*/}
                        {/*<Icon name="ios-star-outline" size={25} color={color.white} />*/}
                        {/*<Tip color={color.white}>{data.subscribedCount}</Tip>*/}
                    {/*</View>*/}
                </View>
                {/*{this.sectionHeader()}*/}
            </View>
        )
    };
    renderItem = ({item, index}) => {
        const { currentPlayId } = this.props;
        const flag = currentPlayId === item.id;
        return (
            <View style={{height: 50, width: screen.width, flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
                <View style={{ width: 25, justifyContent: 'center', alignItems: 'center'}}>
                    {
                        flag ? <Icon name="ios-volume-down-outline" color={color.theme} size={22} /> : <Tip title={index + 1} style={{fontSize: 12,}} />
                    }
                </View>
                <View style={{flex: 1, flexDirection: 'row',alignItems: 'center', height: '100%', marginLeft: 10, paddingRight: 10, borderBottomWidth: screen.onePixel, borderColor: color.border}} >
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.playSong(item.id)}>
                            <Normal numberOfLines={1} style={{fontSize: 14}} color={flag ? color.theme : color.black}>{item.title}</Normal>
                            <Tip title={item.subTitle} color={flag ? color.theme : color.black} numberOfLines={1} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: 60, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Icon name="ios-list-outline" size={30} />
                    </View>
                </View>
            </View>
        )
    };
    sectionHeader = () => (
        <View style={{height: 50, width: screen.width, flexDirection: 'row', paddingLeft: 10, alignItems: 'center', backgroundColor: '#ffffff'}}>
            <View style={{width: 25, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={this.pause}><Icon name="ios-play-outline" size={30} /></TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row',alignItems: 'center', height: '100%', marginLeft: 10, paddingRight: 10, borderBottomWidth: screen.onePixel, borderColor: color.border}} >
                <H3 title="播放全部" />
                <Normal title={`（共${this.state.data.tracks.length}首）`} />
                <View style={{flex: 1}} />
                <Icon name="ios-list-outline" size={30} />
            </View>
        </View>
    );
    scrollToIndex = (params) => {   // flatlist滚到顶部
        alert(JSON.stringify(params))
    };
    render() {
        const { dataList, refreshing, data } = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={{backgroundColor: '#777777', height: 50, width: screen.width}}>
                    {/*, position: 'absolute', top: 0, zIndex: 3, opacity: 0.8*/}
                    <View style={{height: 50, width: screen.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
                        <Image source={{uri: data && `${data.coverImgUrl}?param=250y150`}} style={[styles.bg, {zIndex: -1, alignSelf: 'baseline', height: screen.width * 0.6 + 50}]} blurRadius={4} />
                        {/*<View style={{width: screen.width, height: screen.width * 0.7, position: 'absolute', top: 50, zIndex: 2, backgroundColor: '#ffffff', opacity: 0.3,}} />*/}
                        <TouchableOpacity
                            onPress={() => {
                                const backAction = NavigationActions.back();
                                console.log(backAction);
                                this.props.navigation.dispatch(backAction);
                            }}
                            style={{width: screen.width * 0.25, paddingLeft: 10}}
                        >
                            <Icon name="ios-arrow-back" size={25} color={color.white} />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center', alignItems: 'center', width: screen.width * 0.5}}>
                            <H3 title={ this.props.navigation.state.params.title} color={color.white} />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: screen.width * 0.25, paddingRight: 10}}>
                            <Icon name="ios-more" size={25} style={{marginRight: 10}} color={color.white} />
                            <Icon name="ios-stats" size={25} color={color.white} />
                        </View>
                    </View>
                </View>

                <SectionList
                    style={{backgroundColor: '#fff'}}
                    onRefresh={this.requestDetail}
                    refreshing={refreshing}
                    keyExtractor={(item, index) => index}
                    sections={[{key: '1', data: dataList}]}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.sectionHeader}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
                    stickySectionHeadersEnabled
                    scrollToLocation={this.scrollToLocation}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: screen.width * 0.6,
        width: screen.width,
        backgroundColor: '#777777',
        // top: -50,
        // paddingTop: 15,
    },
    bg: {
        position: 'absolute',
        top: 0,
        // bottom: 0,
        // right: 0,
        // left: 0,
        opacity: 0.3,
        height: screen.width * 0.6,
        width: screen.width,
    },
});

const mapStateToProps = ({currentPlay}) => ({
    currentPlayId: currentPlay.id,
});

export default connect(mapStateToProps)(DetailScene);
