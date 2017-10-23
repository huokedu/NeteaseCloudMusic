/**
 * Created by 叶子 on 2017/8/22.
 */
import React, { PureComponent } from 'react';
import { Text, View, FlatList, ListView } from 'react-native';
import { IconMenu, Separator, BasicSwiper, ImageSWiper, GridItem } from '../widgets';
import { screen } from '../utils';
import ListContainer from './ListContainer';
import { PERSONALIZED, PERSONALIZED_PRIVATECONTENT, PERSONALIZED_NEWSONG, PERSONALIZED_MV, BANNER } from '../api';

class MainScene extends PureComponent {
    state = {
        dataList: [],
        refreshing: true,
        banner: []
    };
    componentWillMount() {
        // this.setState({
        //     dataList: [
        //         {
        //             type: 'playlist',
        //             title: '推荐音乐',
        //             data: [{title: '听完这些歌我觉得自己变成了祥林嫂', image: require('../imgs/img/slider4.jpg')},
        //                 {title: '有一种情歌的语言，有一种英文的自传。', image: require('../imgs/img/19145795974784949.jpg')},
        //                 {title: '有一种情歌的语言，有一种英文的自传。', image: require('../imgs/img/528865105234307.jpg')},
        //                 {title: '有一种情歌的语言，有一种英文的自传。', image: require('../imgs/img/528865105234307.jpg')},
        //                 {title: '有一种情歌的语言，有一种英文的自传。', image: require('../imgs/img/19145795974784949.jpg')},
        //                 {title: '听完这些歌我觉得自己变成了祥林嫂', image: require('../imgs/img/slider4.jpg')},]
        //         },
        //         {
        //             type: 'special',
        //             title: '独家放送',
        //             data: [{title: '软萌小姐姐原创曲弹唱，全程微笑甜到飞起！', image: require('../imgs/img/slider4.jpg'), width: 0.49},
        //                 {title: '清新小调 喜欢这种刚刚好', image: require('../imgs/img/19145795974784949.jpg'), width: 0.49},
        //                 {title: '⚡️17年8月新热电音推送。', image: require('../imgs/img/528865105234307.jpg'), width: 1}, ]
        //         },
        //         {
        //             type: 'newsongs',
        //             title: '最新音乐',
        //             data: [{title: '忘不掉', subTitle: '孙俪', image: require('../imgs/img/slider4.jpg')},
        //                 {title: '初梦', subTitle: '初音ミク  /  MusikM', image: require('../imgs/img/19074327718953837.jpg')},
        //                 {title: '初梦', subTitle: '初音ミク  /  MusikM', image: require('../imgs/img/109951162819638071.jpg')},]
        //         },
        //         {
        //             type: 'mv',
        //             title: '推荐MV',
        //             data: [{title: '给大家的歌', subTitle: '鹿先森乐队', image: require('../imgs/img/slider4.jpg'), width: 0.49},
        //                 {title: '英雄归来', subTitle: 'PG One', image: require('../imgs/img/19074327718953837.jpg'), width: 0.49},
        //                 {title: '清白之年', subTitle: '朴树', image: require('../imgs/img/109951162819638071.jpg'), width: 0.49},
        //                 {title: 'Papillon', subTitle: '王嘉尔 - (Jackson of GOT7)', image: require('../imgs/img/109951163013685863.jpg'), width: 0.49},]
        //         },
        //     ]
        // });
    }
    componentDidMount() {
        this.requestData();
    }
    requestData = () => {
        try {
            (async () => {
                const datas = [];
                // 推荐音乐
                const res = await fetch(PERSONALIZED);
                const personalized = await res.json();
                datas.push({
                    type: 'playlist',
                    title: '推荐音乐',
                    data: personalized.result.map(v => ({...v, title: v.name, picUrl: v.picUrl + '?param=140y140'}))
                });
                // // 独家放送
                // const res2 = await fetch(PERSONALIZED_PRIVATECONTENT);
                // const personalized_privatecontent = await res2.json();
                // datas.push({
                //     type: 'special',
                //     title: '独家放送',
                //     data: personalized_privatecontent.result.map((v, i) => ({...v, title: v.name, width: i === 2 ? 1 : 0.49}))
                // });
                // // 最新音乐
                // const res3 = await fetch(PERSONALIZED_NEWSONG);
                // const personalized_newsong = await res3.json();
                // datas.push({
                //     type: 'newsongs',
                //     title: '最新音乐',
                //     data: personalized_newsong.result.filter((v, i) => i < 6).map((v, i) => ({...v, title: v.name, subTitle: v.song.artists.map(a => a.name).join(';'), picUrl: v.song.album.picUrl + '?param=140y140'}))
                // });
                // 推荐MV
                const res4 = await fetch(PERSONALIZED_MV);
                const personalized_mv = await res4.json();
                datas.push({
                    type: 'mv',
                    title: '推荐MV',
                    data: personalized_mv.result.map((v, i) => ({...v, title: v.name, subTitle: v.artistName, picUrl: v.picUrl + '?param=140y140', width: 0.49}))
                });
                this.setState({
                    dataList: [...datas],
                    refreshing: false
                });
                this.requestBanner();

            })();
        }catch(err) {
            alert(err)
        }
    };
    requestBanner = () => {
        try {
            (
                async () => {
                    const res = await fetch(BANNER);
                    const json = await res.json();
                    this.setState({
                        banner: json.banners
                    })
                }
            )();
        } catch (err) {
            alert(err);
        }
    };
    renderHeader = () => (
        <View>
            {/*<BasicSwiper />*/}
            <ImageSWiper banner={this.state.banner} />
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', height: screen.width / 4}}>
                <IconMenu icon="md-radio" title="私人FM" />
                <IconMenu icon="md-calendar" title="每日歌曲推荐" />
                <IconMenu icon="md-stats" title="云音乐热歌榜" />
            </View>
            <Separator />
        </View>

    );
    renderItem = ({item, index}) => (
        <ListContainer title={item.title} dataList={item.data} navigation={this.props.navigation} type={item.type} />
    );
    render() {
        const { dataList, refreshing } = this.state;
        return (
            <View style={{flex:1}}>
                <FlatList
                    data={dataList}
                    refreshing={refreshing}
                    onRefresh={this.requestData}
                    keyExtractor={(item, index) => index}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderItem}
                    ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
                />
            </View>
        )
    }
}

export default MainScene;
