/**
 * Created by 叶子 on 2017/8/22.
 */
import React, { PureComponent } from 'react';
import { Text, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import PlaylistHeader from './PlaylistHeader';
import { screen, color } from '../utils';
import { TextTool } from '../widgets';
import ListContainer from './ListContainer';
import { PLAYLIST_HIGHQUALITY } from '../api';

const { Normal } = TextTool;

class PlaylistScene extends PureComponent {
    state = {
        dataList: [
            {
                type: 'mv',
                title: '推荐MV',
                data: [],
                // data: [{title: '给大家的歌', subTitle: '鹿先森乐队', image: require('../imgs/img/slider4.jpg'), width: 0.49},
                //     {title: '英雄归来', subTitle: 'PG One', image: require('../imgs/img/19074327718953837.jpg'), width: 0.49},
                //     {title: '清白之年', subTitle: '朴树', image: require('../imgs/img/109951162819638071.jpg'), width: 0.49},
                //     {title: 'Papillon', subTitle: '王嘉尔 - (Jackson of GOT7)', image: require('../imgs/img/109951163013685863.jpg'), width: 0.49},
                //     {title: '给大家的歌', subTitle: '鹿先森乐队', image: require('../imgs/img/slider4.jpg'), width: 0.49},
                //     {title: '英雄归来', subTitle: 'PG One', image: require('../imgs/img/19074327718953837.jpg'), width: 0.49},
                //     {title: '清白之年', subTitle: '朴树', image: require('../imgs/img/109951162819638071.jpg'), width: 0.49},
                //     {title: 'Papillon', subTitle: '王嘉尔 - (Jackson of GOT7)', image: require('../imgs/img/109951163013685863.jpg'), width: 0.49},]
            },
        ],
        headerData: {},
        refreshing: true,
    };
    componentDidMount() {
        this.requestData(21);
    }
    requestData = (limit = 20) => {
        try {
            (async () => {
                const datas = [];
                // 推荐音乐
                const res = await fetch(`${PLAYLIST_HIGHQUALITY}?limit=${limit}`);
                const playlist_highquality = await res.json();
                // console.log(playlist_highquality);
                datas.push({
                    type: 'playlist',
                    title: '精品歌单',
                    data: playlist_highquality.playlists.filter((v, i) => i > 0).map(v => ({...v, title: v.name, picUrl: v.coverImgUrl + '?param=240y140', width: 0.49}))
                });
                this.setState({
                    dataList: [...datas],
                    refreshing: false,
                    headerData: playlist_highquality.playlists[0]
                });
            })();
        }catch(err) {
            console.log(err)
        }
    };
    renderHeader = () => (
        <View style={{flex: 1}}>
            <PlaylistHeader data={this.state.headerData} />
            <View style={styles.headerMenu}>
                <TouchableOpacity style={styles.allBtn}>
                    <Text style={{}}>全部歌单 ></Text>
                </TouchableOpacity>
                <View style={{flex: 1}} />
                <View style={{flexDirection: 'row'}}>
                    <Normal title="欧美" />
                    <Normal title="华语" style={{marginLeft: 15}} />
                    <Normal title="嘻哈" style={{marginLeft: 15}} />
                </View>
            </View>
        </View>
    );
    renderItem = ({item, index}) => (
        <ListContainer dataList={item.data} title={item.title} navigation={this.props.navigation} />
    );
    render() {
        const { dataList, refreshing } = this.state;
        return (
            <FlatList
                style={{backgroundColor: '#fff'}}
                data={dataList}
                refreshing={refreshing}
                onRefresh={this.requestData}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={this.renderHeader}
                renderItem={this.renderItem}
                ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
            />
        )
    }
}

const styles = StyleSheet.create({
    headerMenu: {
        height: screen.width / 7,
        width: screen.width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 7,
        paddingRight: 7
    },
    allBtn: {
        width: 100,
        height: 30,
        borderWidth: screen.onePixel,
        borderColor: color.border,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PlaylistScene;