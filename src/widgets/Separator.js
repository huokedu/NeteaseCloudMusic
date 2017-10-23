/**
 * Created by 叶子 on 2017/8/29.
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { screen, color } from '../utils';

class Separator extends PureComponent {
    render() {
        return (
            <View style={[styles.line, this.props.style]} />
        )
    }
}

const styles = StyleSheet.create({
    line: {
        width: screen.width,
        height: screen.onePixel,
        backgroundColor: color.border
    }
});

export default Separator;