/**
 * Created by 叶子 on 2017/8/22.
 */
import React, { PureComponent } from 'react';
import { Text, FlatList } from 'react-native';
import { DJPROGRAM_PERSONALIZED } from '../api';
import ListContainer from './ListContainer';
import { Spin } from '../widgets';

class RadioScene extends PureComponent {
    state = {
        datas: [],
        refreshing: true,
    };
    componentWillMount() {
        this.fetchData();
    }
    fetchData = () => {
        (
            async () => {
                try {
                    const res = await fetch(DJPROGRAM_PERSONALIZED);
                    const { result } = await res.json();
                    this.setState({datas: [{
                        type: 'djprogram_personalized',
                        title: '电台个性推荐',
                        data: result.map(v => ({...v, title: v.program.radio.name, picUrl: v.program.radio.picUrl + '?param=140y140'}))
                    }], refreshing: false});
                } catch (err) {
                    alert(err);
                }
            }
        )();
    };
    renderItem = ({item, index}) => (
        <ListContainer title={item.title} dataList={item.data} navigation={this.props.navigation} type="djprogram" />
    );
    render() {
        const { datas, refreshing } = this.state;
        return (
            <FlatList
                style={{flex: 1}}
                data={datas}
                refreshing={refreshing}
                onRefresh={this.fetchData}
                keyExtractor={(item, index) => index}
                // ListHeaderComponent={this.renderHeader}
                renderItem={this.renderItem}
                ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
            />
        )
    }
}

export default RadioScene;