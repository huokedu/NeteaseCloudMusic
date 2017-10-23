/**
 * Copyright 2017-present, chenghao.
 * All rights reserved.
 *
 * 添加注释
 * Created by SEELE on 2017/10/13
 *
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Avatar from './Avatar';
import { Normal, Tip } from './TextTool';
import Icon from 'react-native-vector-icons/Ionicons';
import timeago from 'timeago.js';
import { color } from '../utils';

class CommentItem extends PureComponent {
    render() {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                    <Avatar img={{uri: data.user.avatarUrl + '?param=80y80'}} size={30} />
                </View>
                <View style={styles.textContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Normal color={color.gray}>{data.user.nickname}</Normal>
                        <View style={{flex: 1}} />
                        <Tip style={{marginRight: 5}} color={color.gray}>{data.likedCount}</Tip>
                        <Icon name="ios-thumbs-up-outline" size={20} color={color.gray} />
                    </View>
                    <Tip color={color.gray}>{timeago().format(data.time, 'zh_CN')}</Tip>
                    <View style={{height: 10}} />
                    {
                        data.beReplied.length === 0 && <Normal>{data.content}</Normal>
                    }
                    {
                        data.beReplied.length > 0 && (
                            <View>
                                <Normal>回复<Normal color={color.blue}>@{data.beReplied[0].user.nickname}</Normal>:{data.content}</Normal>
                                <View style={{marginTop: 10,padding: 10, borderWidth: 1, borderColor: color.border, backgroundColor: color.white}}>
                                    <Normal><Normal color={color.blue}>@{data.beReplied[0].user.nickname}</Normal>:{data.beReplied[0].content}</Normal>
                                </View>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: color.backgroundColor
    },
    textContainer: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: color.border
    }
});

export default CommentItem;