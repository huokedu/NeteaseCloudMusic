/**
 * Created by SEELE on 2017/9/6.
 * 排行榜容器组件
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Container from './Container';
import { screen } from '../utils';
import { GridItem, TextTool } from '../widgets';

const { H3 } = TextTool;

class TopContainer extends PureComponent {
    render() {
        const { title, dataList } = this.props;
        return (
            <Container title={title}>
                {
                    dataList.map((v, i) => (
                        <View style={styles.container} key={i}>
                            <GridItem width={v.width || 0.325} title={v.title} subTitle={v.subTitle} image={v.image} tip={v.tip} />
                            <View style={{flex: 1, paddingLeft: 10, borderBottomWidth: screen.onePixel, borderColor: '#eaeaea'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', width: screen.width / 3 * 2, height: screen.width / 3 / 3}} >
                                    <H3 title="1. 行走在茫茫月光中间" numberOfLines={1} style={{color: '#656565'}} />
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', width: screen.width / 3 * 2, height: screen.width / 3 / 3}} >
                                    <H3 title="2. 行走在茫茫月光中间" numberOfLines={1} style={{color: '#656565'}} />
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', width: screen.width / 3 * 2, height: screen.width / 3 / 3}} >
                                    <H3 title="3. 行走在茫茫月光中间" numberOfLines={1} style={{color: '#656565'}} />
                                </View>
                            </View>
                        </View>
                    ))
                }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.width / 3,
        flexDirection: 'row',
    }
});

export default TopContainer;
