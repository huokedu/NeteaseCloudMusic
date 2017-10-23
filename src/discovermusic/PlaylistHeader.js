/**
 * Created by 叶子 on 2017/9/4.
 * 歌单页面顶部组件
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, } from 'react-native';
import normalizeColor from 'normalizeColor';
import { screen, color } from '../utils';
import { TextTool } from '../widgets';

const { H2, H3, Tip  } = TextTool;

class PlaylistHeader extends PureComponent {
    render() {
        const { data } = this.props;
        return (
            <View style={[styles.container]}>
                <Image style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: screen.width, opacity: 0.2}} source={{uri: data.coverImgUrl}} />
                <Image source={{uri: data.coverImgUrl}} style={styles.image} />
                <View style={styles.descContainer}>
                    <H2 title="精品歌单 >" style={{marginBottom: 5, color: '#fff'}} />
                    <H3 title={data.name} style={{color: '#fff'}} />
                    <Tip title={data.copywriter} style={{color: '#fff'}} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.width / 3,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 20,
        paddingBottom: 13,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#a0a0a0'
    },
    image: {
        width: screen.width / 4,
        height: screen.width / 4,
    },
    descContainer: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: 'transparent'
    }
});

export default PlaylistHeader;