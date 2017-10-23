/**
 * Created by 叶子 on 2017/8/23.
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { screen, color } from '../utils';
import Icon from 'react-native-vector-icons/Ionicons';

class IconMenu extends PureComponent {
    render() {
        const { title, icon } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Icon name={icon} size={25} color="#D43C33" />
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width / 4,
        height: screen.width / 4,
    },
    iconContainer: {
        height: '50%',
        width: '50%',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: color.theme,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 5,
        fontSize: 11,
        color: color.black
    }
});

export default IconMenu;