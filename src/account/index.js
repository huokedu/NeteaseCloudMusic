/**
 * Created by 叶子 on 2017/8/20.
 */
import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, TextTool, Separator, MenuRow } from '../widgets';
import { screen, color } from '../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { H3, Normal, Tip } = TextTool;

class Account extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerTitle: <H3 color="#ffffff">账号</H3>,
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Player', {title: '播放器'})}><Icon name="signal" size={30} color="#ffffff"/></TouchableOpacity>,
        headerStyle: {
            backgroundColor: color.theme,
            paddingRight: 10,
            paddingLeft: 10
        }
    });
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{height: screen.width / 4, width: screen.width, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10, backgroundColor: '#ffffff'}}>
                    <Avatar />
                    <View style={{marginLeft: 10}}>
                        <Normal style={{fontSize: 14}}>yezihaohao</Normal>
                        <Tip>VIP10</Tip>
                    </View>
                    <View style={{flex: 1}} />
                    <TouchableOpacity style={{borderRadius: 20, borderWidth: screen.onePixel / 4, padding: 5, paddingLeft: 10, paddingRight: 10}}><Normal>已签到</Normal></TouchableOpacity>
                </View>
                <Separator />
                <View style={{height: screen.width / 8, width: screen.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#ffffff'}}>
                    <View style={{width: '25%', height: '60%', borderRightWidth: screen.onePixel, borderColor: color.border, alignItems: 'center'}}>
                        <Tip>动态</Tip>
                        <Normal>10</Normal>
                    </View>
                    <View style={{width: '25%', height: '60%', borderRightWidth: screen.onePixel, borderColor: color.border, alignItems: 'center'}}>
                        <Tip>动态</Tip>
                        <Normal>10</Normal>
                    </View>
                    <View style={{width: '25%', height: '60%', borderRightWidth: screen.onePixel, borderColor: color.border, alignItems: 'center'}}>
                        <Tip>动态</Tip>
                        <Normal>10</Normal>
                    </View>
                    <View style={{width: '25%', height: '60%', alignItems: 'center'}}>
                        <Icon name="lead-pencil" size={15} />
                        <Tip>我的资料</Tip>
                    </View>
                </View>
                <View style={{height: 10}} />
                <View style={{backgroundColor: '#ffffff'}}>
                    <MenuRow leftIcon="email-outline" title="我的消息" border={false} rightIcon />
                </View>
                <View style={{height: 10}} />
                <View style={{backgroundColor: '#ffffff'}}>
                    <MenuRow leftIcon="diamond" title="会员中心" rightIcon />
                    <MenuRow leftIcon="cart-outline" title="商城" rightIcon />
                    <MenuRow leftIcon="headphones-box" title="在线听歌免流量" rightIcon border={false} />
                </View>
                <View style={{height: 10}} />
                <View style={{backgroundColor: '#ffffff'}}>
                    <MenuRow leftIcon="settings" title="设置" rightIcon />
                    <MenuRow leftIcon="qrcode-scan" title="扫一扫" rightIcon />
                    <MenuRow leftIcon="all-inclusive" title="个性换肤" rightIcon />
                    <MenuRow leftIcon="lightbulb-outline" title="夜间模式" rightIcon />
                    <MenuRow leftIcon="clock" title="定时开关" rightIcon />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEFF1',
        flex: 1
    }
});

export default Account;