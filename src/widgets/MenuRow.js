/**
 * Copyright 2017-present, Karakal.
 * All rights reserved.
 *
 * 菜单组件列表组件
 * Created by SEELE on 2017/9/30
 *
 */
import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { screen, color } from '../utils';
import { H4, Tip, H3 } from './TextTool';

class MenuRow extends PureComponent {
    render() {
        const { leftIcon, ionIcon, title, subTitle, rightIcon, border = true, rightTip, image, video, rightIconName, leftText } = this.props;
        const borderStyle = border ? {borderBottomWidth: screen.onePixel, borderColor: color.border} : {};
        return (
            <View style={{height: screen.width * 0.137, paddingLeft: 8, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: video ? 90 : 45, justifyContent: 'center', alignItems: 'center', marginRight: image ? 10 : 0}}>
                    {leftText && <H3>{leftText}</H3>}
                    {leftIcon && <Icon name={leftIcon} size={25} />}
                    {ionIcon && <Icon2 name={ionIcon} size={25} />}
                    {image && <Image source={image} style={{width: '100%', height: '90%', marginLeft: 10}} />}
                    {video && <Image source={video} style={{width: '100%', height: '90%', marginLeft: 10}} />}
                </View>
                <View style={[{flex: 1, height: '100%', flexDirection: 'row'}, borderStyle]}>
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <H4 numberOfLines={1}>{title}</H4>
                        {subTitle && <Tip numberOfLines={1} style={{marginTop: 5}}>{subTitle}</Tip>}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 8}}>
                        {rightTip && <Tip numberOfLines={1}>{rightTip}</Tip>}
                        {rightIcon && <Icon name="chevron-right" size={20} />}
                        {!!rightIconName && <Icon2 name={rightIconName} size={20} />}
                    </View>
                </View>
            </View>
        )
    }
}

export default MenuRow;
