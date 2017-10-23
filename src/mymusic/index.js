/**
 * Created by 叶子 on 2017/8/20.
 */
import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color, screen } from '../utils';
import { TextTool, MenuRow, ListFooter } from '../widgets';
import { USER_PLAYLIST } from '../api';

const { H4, Tip } = TextTool;

class MyMusic extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <View style={{width: screen.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20}}>
                <H4 color="#ffffff">更多</H4>
                <H4 color="#ffffff">我的音乐</H4>
                <TouchableOpacity onPress={() => navigation.navigate('Player', {title: '播放器'})}><Icon name="ios-stats-outline" size={30} color="#ffffff" /></TouchableOpacity>
            </View>
        ),
        headerStyle: {
            backgroundColor: color.theme
        }
    });
    state = {
        refreshing: true,
        createPlaylist: [],     // 创建的歌单
        collectPlaylist: [],    // 收藏的歌单
    };
    componentWillMount() {
        this.requestData();
    }
    requestData = () => {
        (
            async () => {
                const res = await fetch(USER_PLAYLIST + '16750353');
                const json = (await res.json()).playlist;
                this.setState({
                    createPlaylist: json.filter((v, i) => i < 6),
                    collectPlaylist: json.filter((v, i) => i > 5),
                    refreshing: false,
                })
            }
        )();
    };
    toDetail = id => {
        const { navigation } = this.props;
        navigation.navigate('Detail', {title: '歌单', id})
    };
    renderHeader = () => (
        <View>
            <MenuRow title="本地音乐" ionIcon="ios-musical-notes-outline" rightIcon rightTip="10" />
            <MenuRow title="最近播放" ionIcon="ios-play-outline" rightIcon rightTip="100" />
            <MenuRow title="我的电台" ionIcon="ios-radio-outline" rightIcon rightTip="5" />
            <MenuRow title="我的收藏" ionIcon="ios-star-outline" rightIcon rightTip="80" border={false} />
        </View>
    );
    renderItem = ({item}) => (
        <TouchableOpacity onPress={() => this.toDetail(item.id)}>
            <MenuRow title={item.name} subTitle={`${item.trackCount}首，  by ${item.creator.nickname}`} image={{uri: item.coverImgUrl + '?param=140y140'}} />
        </TouchableOpacity>
    );
    sectionHeader = ({section}) => (
        <View style={{flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: color.border}}>
            <Icon name="ios-arrow-down-outline" size={15} style={{marginLeft: 15}} />
            <Tip style={{marginLeft: 15}}>{section.title}</Tip>
        </View>
    );
    render() {
        const { refreshing, createPlaylist, collectPlaylist } = this.state;
        const sections = [
            {key: 1, title: `我创建的歌单(${createPlaylist.length})`, data: createPlaylist},
            {key: 2, title: `我收藏的歌单(${collectPlaylist.length})`, data: collectPlaylist},
        ];
        return (
            <SectionList
                style={{backgroundColor: '#fff'}}
                onRefresh={this.requestData}
                refreshing={refreshing}
                keyExtractor={(item, index) => index}
                sections={sections}
                renderItem={this.renderItem}
                renderSectionHeader={this.sectionHeader}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={() => <ListFooter />}
                stickySectionHeadersEnabled
            />
        )
    }
}

export default MyMusic;