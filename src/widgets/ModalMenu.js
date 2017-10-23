/**
 * Copyright 2017-present, Karakal.
 * All rights reserved.
 *
 * 弹层组件
 * Created by SEELE on 2017/9/29
 *
 */
import React, { PureComponent } from 'react';
import { Animated, TouchableWithoutFeedback, View, Easing, StyleSheet } from 'react-native';
import { screen } from '../utils';

class ModalMenu extends PureComponent{
    constructor () {
        super();
        this.animatedTop = new Animated.Value(0);
    }
    topAnimate = (start = 0, end = 1) => {
        this.animatedTop.setValue(start);
        Animated.timing(this.animatedTop, {
            toValue: end,
            duration: 150,
            easing: Easing.linear
        }).start();
    };
    render() {
        const topAnimation = this.animatedTop.interpolate({
            inputRange: [0, 1],
            outputRange: [screen.height, 0]
        });
        return (
            <Animated.View style={[styles.container, {top: topAnimation}]}>
                <TouchableWithoutFeedback onPress={() => this.topAnimate(1, 0)}>
                    <View style={styles.cover} />
                </TouchableWithoutFeedback>
                <View style={styles.menuContainer}>
                    {this.props.children}
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: screen.width,
        height: screen.height,
        position: 'absolute',
        zIndex: 5,
        backgroundColor: 'transparent',
    },
    cover: {
        width: screen.width,
        height: screen.height * 0.4,
        backgroundColor: '#777777',
        opacity: 0.7
    },
    menuContainer: {
        width: screen.width,
        height: screen.height * 0.6,
        backgroundColor: '#ffffff'
    }
});

export default ModalMenu;