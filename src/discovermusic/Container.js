/**
 * Created by SEELE on 2017/9/6.
 * item容器组件
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextTool } from '../widgets';
import { color } from '../utils';

const { H3 } = TextTool;

class Container extends PureComponent {
    render() {
        const { title } = this.props;
        return (
            <View style={[styles.container, {marginTop: title ? 10 : 0}]}>
                {
                    title && (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{width: 2, height: 10, backgroundColor: color.theme, marginRight: 10}} />
                            <H3 title={`${title} >`} />
                        </View>
                    )
                }
                <View style={styles.gridContainer}>
                    { this.props.children }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
});

export default Container;

