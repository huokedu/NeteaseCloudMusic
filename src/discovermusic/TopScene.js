/**
 * Created by 叶子 on 2017/8/22.
 */
import React, { PureComponent } from 'react';
import { Text, SectionList, View, FlatList, Image, TouchableOpacity } from 'react-native';
import TopContainer from './TopContainer';
import { color, screen } from '../utils';
import { TOP_LIST } from '../api';
import { ListFooter, TextTool, GridItem } from '../widgets';

const { Normal, H4 } = TextTool;

class TopScene extends PureComponent {
    state = {
        official: [],
        global: [],
        headerList: [],
        refreshing: false,
    };
    componentWillMount() {
        this.setState({
            official: [
                {id: 0, name: '新歌榜', imgUrl: require('../imgs/img/top/0.jpg'), updateTIme: '每天更新', songs: [{name: '追光者', artists: '岑宁儿'}, {name: '爱的大未来', artists: '萧敬腾'}, {name: '带你去旅行', artists: '校长'}]},
                {id: 1, name: '热歌榜', imgUrl: require('../imgs/img/top/1.jpg'), updateTIme: '每周四更新', songs: [{name: '追光者', artists: '岑宁儿'}, {name: '爱的大未来', artists: '萧敬腾'}, {name: '带你去旅行', artists: '校长'}]},
                {id: 2, name: '原创榜', imgUrl: require('../imgs/img/top/2.jpg'), updateTIme: '每周四更新', songs: [{name: '追光者', artists: '岑宁儿'}, {name: '爱的大未来', artists: '萧敬腾'}, {name: '带你去旅行', artists: '校长'}]},
                {id: 3, name: '飙升榜', imgUrl: require('../imgs/img/top/3.jpg'), updateTIme: '每天更新', songs: [{name: '追光者', artists: '岑宁儿'}, {name: '爱的大未来', artists: '萧敬腾'}, {name: '带你去旅行', artists: '校长'}]},
                {id: 4, name: '电音榜', imgUrl: require('../imgs/img/top/4.jpg'), updateTIme: '每周五更新', songs: [{name: '追光者', artists: '岑宁儿'}, {name: '爱的大未来', artists: '萧敬腾'}, {name: '带你去旅行', artists: '校长'}]},
            ],
            global: [
                {id: 5, name: 'UK排行榜周榜', imgUrl: require('../imgs/img/top/5.jpg'), updateTIme: '每周四更新',},
                {id: 6, name: '美国Billboard周榜', imgUrl: require('../imgs/img/top/5.jpg'), updateTIme: '每周四更新',},
                {id: 7, name: 'KTV嗨榜', imgUrl: require('../imgs/img/top/5.jpg'), updateTIme: '每周四更新',},
                {id: 8, name: 'iTunes榜', imgUrl: require('../imgs/img/top/5.jpg'), updateTIme: '每周四更新',},
                {id: 9, name: 'Hit FM Top榜', imgUrl: require('../imgs/img/top/5.jpg'), updateTIme: '每周四更新',},
                {id: 10, name: '日本Oricon周榜', imgUrl: require('../imgs/img/top/5.jpg'), updateTIme: '每周四更新',},
            ]
        })
    };
    fetchData = () => {
        // for (let i = 0; i++; i < 5 ) {
        //     this.fetchTop(i);
        // }
        this.fetchTop(0);
    };
    fetchTop = (index) => {
        (
            async () => {
                try {
                    const res = await fetch(TOP_LIST + index);
                    const {result} = await res.json();
                    this.setState({
                        official: [...this.state.official, result]
                    });
                    console.log(result);
                    console.log(index);
                } catch (err) {
                    alert(err);
                }
            }
        )();
    };
    sectionHeader = ({section}) => (
        <H4 style={{paddingVertical: 15}}>{section.title}</H4>
    );
    renderItem = ({section}) => section.renderItem;
    toDetail = (id) => {
        const { navigation } = this.props;
        navigation.navigate('Detail', {title: '榜单', id, type: 'top'});
    };
    render() {
        const { refreshing, official, global} = this.state;
        const sections = [
            {title: '云音乐官方榜', key: '1', data: official, renderItem: ({item, index}) => (
                <TouchableOpacity onPress={() => this.toDetail(item.id)}>
                    <View style={{width: screen.width, height: screen.width / 4, flexDirection: 'row', paddingTop: 3}}>
                        <Image source={item.imgUrl} style={{width: screen.width / 4, height: '100%'}} />
                        <View style={{flex: 1, justifyContent: 'space-around', borderBottomWidth: screen.onePixel, borderColor: color.border, padding: 5}}>
                            {item.songs.map((v, i) => <Normal key={i} numberOfLines={1}>{i+1}. {v.name} - {v.artists}</Normal>)}
                        </View>
                    </View>
                </TouchableOpacity>
            )},
            {title: '全球榜', key: '2', data: [1], renderItem: ({item, section}) => (
                <FlatList
                    data={global}
                    keyExtractor={(item, index) => index}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({item}) => <GridItem item={item} width={0.325} title={item.name} image={item.imgUrl} onPress={() => this.toDetail(item.id)} />}
                    horizontal={false}
                    numColumns={3}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                />
            )}
        ];
        return (
            <SectionList
                style={{flex: 1, backgroundColor: color.backgroundColor,}}
                onRefresh={this.fetchData}
                refreshing={refreshing}
                keyExtractor={(item, index) => index}
                sections={sections}
                renderSectionHeader={this.sectionHeader}
                // ListHeaderComponent={this.renderHeader}
                // renderItem={this.renderItem}
                ListFooterComponent={() => <ListFooter />}
                // stickySectionHeadersEnabled
            />
        )
    }
}

export default TopScene;