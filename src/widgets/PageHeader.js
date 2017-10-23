/**
 * Created by chenghao on 2017/10/11.
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions, withNavigation } from 'react-navigation';
import { screen, color } from '../utils';
import { H3 } from './TextTool';

class PageHeader extends PureComponent {
    render() {
        const { navigation, backgroundColor, title } = this.props;
        return (
            <View style={[styles.container, {backgroundColor}]}>
                <TouchableOpacity
                    onPress={() => {
                        const backAction = NavigationActions.back();
                        navigation.dispatch(backAction);
                    }}
                    style={styles.backIcon}
                >
                    <Icon name="ios-arrow-back" size={25} color={color.white} />
                </TouchableOpacity>
                <View style={styles.title}>
                    {
                        title && (
                            <H3 title={title} color={color.white} />
                        )
                    }
                </View>
                <View style={styles.rightIcon}>
                    <Icon name="ios-more" size={25} style={{marginRight: 10}} color={color.white} />
                    <TouchableOpacity onPress={() => navigation.navigate('Player', {title: '播放器'})}>
                        <Icon name="ios-stats" size={25} color={color.white} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: screen.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        zIndex: 99,
    },
    backIcon: {
        width: screen.width * 0.25,
        paddingLeft: 10,
        backgroundColor: 'transparent',
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screen.width * 0.5,
        backgroundColor: 'transparent'
    },
    rightIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: screen.width * 0.25,
        paddingRight: 10,
        backgroundColor: 'transparent'
    }
});

export default withNavigation(PageHeader);