/**
 * Created by 叶子 on 2017/8/30.
 */
import React, { Component } from 'react'
import {
    ScrollView,
    Image,
    StyleSheet,
    View,
} from 'react-native'
import { screen } from '../utils';
import imgs from '../imgs';

export default class extends Component {
    state = {
        currentPage: 0
    };
    /**
     * 当一页滑动结束时调用
     * @param scrollView
     */
    onAnimationEnd = (scrollView) => {
        // 计算一页滑动的偏移量
        const offSetX = scrollView.nativeEvent.contentOffset.x;
        console.log(offSetX);
        // 算出当前为第几页
        const currentPage = Math.floor((offSetX / screen.width));
        this.setState({
            currentPage: currentPage
        });
    };
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onMomentumScrollEnd={(scrollView) => this.onAnimationEnd(scrollView)}
                >
                    <Image source={imgs.slider.slider1} style={styles.slide}/>
                    <Image source={imgs.slider.slider2} style={styles.slide}/>
                    <Image source={imgs.slider.slider3} style={styles.slide}/>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    contentContainer: {
    },
    slideContainer: {
        flexDirection: 'row'
    },
    slide: {
        width: screen.width,
        height: screen.width / 3,
    }
});