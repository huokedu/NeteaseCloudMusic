/**
 * Created by 叶子 on 2017/8/20.
 */
import React, { PureComponent } from 'react';
import { Text, SectionList, View, Animated, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { screen, color } from '../utils';
import { TextTool, Avatar, PageHeader } from '../widgets';

const { H3, H4, Tip } = TextTool;
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const AnimatedScrollableTabView = Animated.createAnimatedComponent(ScrollableTabView);
const windowHeight = screen.width * 0.7;

class Friends extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        header: null
    });
    state = {
        refreshing: true,
        scrollY: new Animated.Value(0)
    };
    renderHeader = () => (
        <Animated.View style={{height: screen.width * 0.7 + 50, backgroundColor: 'transparent', alignItems: 'center', position: 'absolute',
            left: 0,
            top: 50,
            right: 0,
            bottom: 0,
            zIndex: 9,
            width: screen.width,
            opacity: this.state.scrollY.interpolate({
                inputRange: [-windowHeight, 0, windowHeight / 1.2],
                outputRange: [1, 1, 0],
                extrapolate: 'clamp'
            }),
            transform: [{
                translateY: this.state.scrollY.interpolate({
                    inputRange: [ -windowHeight, 0, windowHeight],
                    outputRange: [windowHeight/2, 0, -50],
                    extrapolate: 'clamp'
                })
            }]}}
        >
            <Avatar img={require('../imgs/img/109951163013685863.jpg')} />
            <H3 color="#ffffff" style={{marginTop: 5, marginBottom: 5}}>yezihaohao</H3>
            <Tip color="#ffffff" style={{marginTop: 5, marginBottom: 5}}>云音乐达人</Tip>
            <Tip color="#ffffff" style={{marginTop: 5, marginBottom: 5}}>关注 96 | 粉丝 1800</Tip>
            <View style={{borderWidth: screen.onePixel, borderColor: '#ffffff', borderRadius: 10, width: 80, flexDirection: 'row', alignItems: 'center', height: 20}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="ios-add-outline" size={15} color="#ffffff" style={{marginLeft: 15}} />
                    <Tip color="#ffffff">关注</Tip>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name="ios-mail-outline" size={15} color="#ffffff" style={{marginLeft: 15}} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
    sectionHeader = () => (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 40, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: color.border}}>
            <View style={{flexDirection: 'row', alignItems: 'center', height: '100%', borderBottomWidth: 2, borderColor: color.theme}}>
                <H4>音乐</H4>
                <Tip>54</Tip>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <H4>动态</H4>
                <Tip>150</Tip>
            </View>
        </View>
    );
    renderItem = () => (
        <View style={{height: 80}}>
            <Text>测试</Text>
        </View>
    );
    onScroll = (obj) => {
        console.log(obj);
    };
    render() {
        const sections = [
            {key: 1, title: `我创建的歌单`, data: [1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,]},
        ];
        const { scrollY } = this.state;
        const windowHeight = screen.width * 0.7;
        const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
        return (
            <View style={{flex: 1}}>
                <Animated.Image
                    style={{
                        position: 'absolute',
                        backgroundColor: '#2e2f31',
                        width: screen.width,
                        resizeMode: 'cover',
                        height: windowHeight,
                        opacity: scrollY.interpolate({
                            inputRange: [-windowHeight, 0, windowHeight / 1.2],
                            outputRange: [1, 1, 0.4],
                            extrapolate: 'clamp'
                        }),
                        transform: [{
                            translateY: scrollY.interpolate({
                                inputRange: [ -windowHeight, 0, windowHeight],
                                outputRange: [windowHeight/2, 0, -50],
                                extrapolate: 'clamp'
                            })
                        },{
                            scale: scrollY.interpolate({
                                inputRange: [ -windowHeight, 0, windowHeight],
                                outputRange: [2, 1, 1]
                            })
                        }]
                    }}
                    source={require('../imgs/img/18894007811887644.jpg')}
                />
                <PageHeader />
                {this.renderHeader()}

                <Animated.View style={{top: screen.width * 0.7 - 50, left:0, right: 0, bottom: 0,height: screen.height - 50,
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [ -windowHeight, 0, windowHeight],
                            outputRange: [windowHeight - 50, 0, -windowHeight + 50],
                            extrapolate: 'clamp'
                        }),
                    }],
                    backgroundColor: '#fff',
                    zIndex: 99

                }}
                >
                    <ScrollableTabView
                        style={{flex: 1}}
                        tabBarBackgroundColor="#ffffff"
                        tabBarActiveTextColor="#D43C33"
                        tabBarInactiveTextColor="#000000"
                        tabBarUnderlineStyle={{backgroundColor: '#D43C33'}}
                        renderTabBar={() => <DefaultTabBar  />}
                    >
                        <AnimatedSectionList
                            sections={[{key: 1, title: `我创建的歌单`, data: [1, 2, 3]},]}
                            keyExtractor={(item, index) => index}
                            renderItem={() => (
                                <View style={{height: 800, width: screen.width, backgroundColor: '#fff'}}>
                                    <Text>测试</Text>
                                </View>
                            )}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                                { useNativeDriver: true }
                            )}
                            renderSectionHeader={() => <Text>我创建的歌单</Text>}
                            stickySectionHeadersEnabled
                            scrollEventThrottle={26}
                            tabLabel='Tab #0'
                        />
                        <AnimatedSectionList
                            sections={[{key: 1, title: `我创建的歌单`, data: [1]},]}
                            keyExtractor={(item, index) => index}
                            renderItem={() => (
                                <View style={{height: 800, width: screen.width, backgroundColor: '#fff'}}>
                                    <Text>测试</Text>
                                </View>
                            )}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                                { useNativeDriver: true }
                            )}
                            renderSectionHeader={() => <Text>我创建的歌单</Text>}
                            stickySectionHeadersEnabled
                            scrollEventThrottle={16}
                            tabLabel='Tab #1'
                        />
                        <AnimatedSectionList
                            sections={[{key: 1, title: `我创建的歌单`, data: [1]},]}
                            keyExtractor={(item, index) => index}
                            renderItem={() => (
                                <View style={{height: 800, width: screen.width, backgroundColor: '#fff'}}>
                                    <Text>测试</Text>
                                </View>
                            )}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                                { useNativeDriver: true }
                            )}
                            renderSectionHeader={() => <Text>我创建的歌单</Text>}
                            stickySectionHeadersEnabled
                            scrollEventThrottle={16}
                            tabLabel='Tab #2'
                        />
                    </ScrollableTabView>
                </Animated.View>


                {/*<AnimatedSectionList*/}
                    {/*sections={sections}*/}
                    {/*keyExtractor={(item, index) => index}*/}
                    {/*renderItem={this.renderItem}*/}
                    {/*renderSectionHeader={this.sectionHeader}*/}
                    {/*// ListHeaderComponent={this.renderHeader}*/}
                    {/*onScroll={Animated.event(*/}
                        {/*[{ nativeEvent: { contentOffset: { y: scrollY }}}],*/}
                        {/*{ useNativeDriver: true }*/}
                    {/*)}*/}
                    {/*stickySectionHeadersEnabled*/}
                    {/*scrollEventThrottle={16}*/}
                {/*/>*/}

                {/*<Animated.ScrollView*/}
                    {/*style={{backgroundColor: 'transparent'}}*/}
                    {/*// onRefresh={this.requestData}*/}
                    {/*// refreshing={refreshing}*/}
                    {/*// keyExtractor={(item, index) => index}*/}
                    {/*// sections={sections}*/}
                    {/*// renderItem={this.renderItem}*/}
                    {/*// renderSectionHeader={this.sectionHeader}*/}
                    {/*// ListHeaderComponent={this.renderHeader}*/}
                    {/*// ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>----我是有底线的----</Text>}*/}
                    {/*// stickySectionHeadersEnabled*/}
                    {/*onScroll={Animated.event(*/}
                        {/*[{ nativeEvent: { contentOffset: { y: scrollY }}}],*/}
                        {/*{ useNativeDriver: true }*/}
                    {/*)}*/}
                    {/*scrollEventThrottle={16}*/}
                {/*>*/}
                    {/*/!*<Animated.View style={{*!/*/}
                        {/*/!*position: 'relative',*!/*/}
                        {/*/!*height: windowHeight,*!/*/}
                        {/*/!*opacity: scrollY.interpolate({*!/*/}
                            {/*/!*inputRange: [-windowHeight, 0, windowHeight / 1.2],*!/*/}
                            {/*/!*outputRange: [1, 1, 0]*!/*/}
                        {/*/!*}),*!/*/}
                    {/*/!*}}>*!/*/}
                        {/*/!*{this.props.header}*!/*/}
                    {/*/!*</Animated.View>*!/*/}
                    {/*<View style={{height: 800}}>*/}
                        {/*<Text>测试</Text>*/}
                    {/*</View>*/}

                {/*</Animated.ScrollView>*/}
            </View>
        )
    }
}

export default Friends;