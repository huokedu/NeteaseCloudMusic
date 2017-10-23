/**
 * Copyright 2017-present, Karakal.
 * All rights reserved.
 *
 * 弹层菜单
 * Created by SEELE on 2017/9/28
 *
 */
import React, { PureComponent } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../utils';

class ModalMenu extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <TouchableOpacity onPress={() => navigation.navigate('ModalMenu', {title: '测试'})}><Icon name="ios-microphone-outline" size={30} color="#ffffff" style={{marginLeft: 20}} /></TouchableOpacity>,
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Player', {title: '播放器'})}><Icon name="ios-stats-outline" size={30} color="#ffffff" style={{marginRight: 20}} /></TouchableOpacity>,
        headerStyle: {
            backgroundColor: color.theme
        }
    });
    render() {
        return (
            <Text>测试</Text>
        )
    }
}

export default ModalMenu;
