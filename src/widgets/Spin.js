/**
 * Created by chenghao on 2017/10/20.
 */
import React from 'react';
import { Image, View } from 'react-native';
import { screen, color } from '../utils';

export default ({children, spinning}) => (
    <View style={{flex: 1}}>
        {
            spinning && (
                <View
                    style={{height: screen.height, width: screen.width, position: 'absolute', zIndex: 9999, justifyContent: 'center', alignItems: 'center', backgroundColor: color.blackCover}}
                >
                    <Image
                        source={require('../imgs/img/DoubleRing.gif')}
                        style={{width: 50, height: 50}}
                    />
                </View>
            )
        }
        {children}
    </View>
)