/**
 * Copyright 2017-present, chenghao.
 * All rights reserved.
 *
 * 电台详情
 * Created by SEELE on 2017/10/19
 *
 */
import React, { PureComponent } from 'react';
import { View, StyleSheet, SectionList, FlatList, ScrollView, Animated, Text, Image, findNodeHandle, TouchableOpacity } from 'react-native';
import { screen, color } from '../utils';
import { PageHeader, TextTool, MenuRow, ListSectionHeader, Spin } from '../widgets';
import Icon from 'react-native-vector-icons/Ionicons';
// import { BlurView } from 'react-native-blur';
import { DJ_PROGRAM } from '../api';

const { Normal, Tip, H4, H3 } = TextTool;
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const AnimatedScrollViewList = Animated.createAnimatedComponent(ScrollView);
const { width } = screen;
const height = width * 0.7;

class DjDetail extends PureComponent {
    static navigationOptions = () => ({
        header: null
    });
    state = {
        height: screen.width * 0.7,
        scrollY: new Animated.Value(0),     // 上下
        scrollX: new Animated.Value(0),     // 左右
        viewRef: null,
        blur: 0,
        tabActive: 0,
        program: {},
        spinning: true,
    };
    componentDidMount() {
        const { height, scrollX, scrollY } = this.state;
        scrollX.addListener(({value}) => {
            value / screen.width === 0 && this.setState({tabActive: 0});
            value / screen.width === 1 && this.setState({tabActive: 1});
        });
        scrollY.addListener(({value}) => {
            if (value < height) {
                // console.log(value / height * 5);
                // this.setState({blur: value / height * 5})
                this.bgImg._component.setNativeProps({ blurRadius: value / height * 5 });
            }
        });
        this.fetchProgram();
    }
    fetchProgram = () => {
        (
            async () => {
                try {
                    const res = await fetch(DJ_PROGRAM + this.props.navigation.state.params.item.program.radio.id);
                    const program = await res.json();
                    this.setState({program, spinning: false});
                } catch (err) {
                    alert(err);
                }
            }
        )();
    };
    imageLoaded = () => {
        this.setState({ viewRef: findNodeHandle(this.refs.bgImg) });
    };
    tabClick = (index) => {
        console.log(index * screen.width);
        this.scrollView._component.scrollTo({y: 0, x: index * screen.width, animated: true});
        // this.scrollView._component.setNativeProps({style: {transform: [{translateY: 200}]}});
        // this.scrollView.scrollTo({y: 0, x: index * screen.width, animated: true});
    };
    renderHeader = () => {
        const { item } = this.props.navigation.state.params;
        const { radio } = item.program;
        return (
            <View style={styles.header}>
                <View style={{flex: 1}} />
                <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
                    <View>
                        <H3 style={{marginBottom: 15}} color={color.white}>{radio.name}</H3>
                        <Tip style={{marginBottom: 15}} color={color.white}>{radio.subCount}人订阅</Tip>
                    </View>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.subBtn}>
                        <Icon name="ios-star-outline" size={20} color={color.white} />
                        <Normal color={color.white} style={{marginLeft: 5}}>订阅</Normal>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };
    renderSectionHeader = () => {
        const { tabActive, program } = this.state;
        return (
            <View style={{height: 40, backgroundColor: color.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderBottomWidth: 1, borderColor: color.border}}>
                <View style={{width: screen / 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
                    <TouchableOpacity onPress={() => this.tabClick(0)}>
                        <Normal color={tabActive === 0 ? color.theme : color.black}>
                            详情
                        </Normal>
                    </TouchableOpacity>
                </View>
                <View style={{width: screen / 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>
                    <TouchableOpacity onPress={() => this.tabClick(1)}>
                        <Normal color={tabActive === 1 ? color.theme : color.black}>节目 {program.count}</Normal>
                    </TouchableOpacity>
                </View>
                <Animated.View
                    style={{height: 2, width: screen.width / 2, position: 'absolute', bottom: 0, left: 0, backgroundColor: color.theme, transform: [
                        {translateX: this.state.scrollX.interpolate({
                            inputRange: [-screen.width, 0, screen.width],
                            outputRange: [-screen.width / 2, 0, screen.width / 2],
                            extrapolate: 'clamp',
                        })},
                    ],}}
                />
            </View>
        )
    };
    renderItem = () => {
        const { scrollX, program } = this.state;
        const { item } = this.props.navigation.state.params;
        const { radio, dj } = item.program;
        return (
            <AnimatedScrollViewList
                pagingEnabled
                horizontal
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX }}}],
                    { useNativeDriver: true }
                )}
                style={{height: screen.height}}
                showsHorizontalScrollIndicator={false}
                ref={ref => this.scrollView = ref}
            >
                <SectionList
                    style={{width: screen.width}}
                    sections={[{key: 1, title: `我创建的歌单`, data: []},]}
                    keyExtractor={(item, index) => index}
                    ListHeaderComponent={() => (
                        <View style={{height: screen.height, backgroundColor: color.white}}>
                            <View style={{borderLeftWidth: 2, borderColor: color.theme, paddingHorizontal: 10, marginVertical: 20}}><Normal>主播</Normal></View>
                            <View style={{paddingVertical: 5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: color.border}}>
                                <MenuRow
                                    image={{uri: dj.avatarUrl}}
                                    title={dj.nickname}
                                    subTitle={dj.signature || ' '}
                                    rightIcon
                                    border={false}
                                />
                            </View>
                            <View style={{height: 20}}/>
                            <View style={{borderLeftWidth: 2, borderColor: color.theme, paddingHorizontal: 10, marginVertical: 20}}><Normal>电台内容简介</Normal></View>
                            <View style={{paddingHorizontal: 10}}>
                                <Normal>{radio.desc}</Normal>
                            </View>
                        </View>
                    )}
                />
                <SectionList
                    style={{width: screen.width, backgroundColor: color.white}}
                    sections={[{key: 1, title: `节目`, data: program.programs || []},]}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => (
                        <MenuRow
                            leftText={program.count - index}
                            title={item.name}
                            subTitle={`播放：${item.listenerCount}`}
                            rightIconName="ios-more-outline"
                        />
                    )}
                    renderSectionHeader={() => <ListSectionHeader><Tip>共{program.count}期</Tip></ListSectionHeader>}
                    stickySectionHeadersEnabled
                />
            </AnimatedScrollViewList>
        )
    };
    componentWillUnmount() {
        this.state.scrollX.removeAllListeners();
        this.state.scrollY.removeAllListeners();
    }
    render() {
        const { scrollY, blur, spinning } = this.state;
        const { item } = this.props.navigation.state.params;
        const { radio, dj } = item.program;
        return (
            <Spin spinning={spinning}>
                <View style={styles.container}>
                    <Animated.Image
                        style={[styles.bgImg,
                            {
                                height,
                                transform: [
                                    {translateY: scrollY.interpolate({
                                        inputRange: [-height, 0, height],
                                        outputRange: [height / 2, 0, -height / 2],
                                        extrapolate: 'clamp',
                                    })},
                                    {scale: scrollY.interpolate({
                                        inputRange: [-height, 0, height],
                                        outputRange: [2, 1, 1],
                                        extrapolate: 'clamp',
                                    })}
                                ],
                                opacity: scrollY.interpolate({
                                    inputRange: [-width, 0 , width],
                                    outputRange: [1, 1, 0.4],
                                    extrapolate: 'clamp',
                                })
                            }
                        ]}
                        source={{uri: radio.picUrl}}
                        ref={img => this.bgImg = img}
                        // onLoadEnd={this.imageLoaded}
                    >
                        {/*{this.state.viewRef && <BlurView*/}
                        {/*viewRef={this.state.viewRef}*/}
                        {/*style={{*/}
                        {/*position: 'absolute',*/}
                        {/*left: 0,*/}
                        {/*top: 0,*/}
                        {/*bottom: 0,*/}
                        {/*right: 0,*/}
                        {/*}}*/}
                        {/*blurRadius={9}*/}
                        {/*blurType="dark"*/}

                        {/*// The following props are also available on Android:*/}

                        {/*// blurRadius={20}*/}
                        {/*// downsampleFactor={10}*/}
                        {/*// overlayColor={'rgba(0, 0, 255, .6)'}   // set a blue overlay*/}
                        {/*/>}*/}
                        <Animated.View
                            style={{top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', backgroundColor: color.blackCover, opacity: scrollY.interpolate({
                                inputRange: [-height, 0 , height / 2],
                                outputRange: [0, 0, 1],
                                extrapolate: 'clamp',
                            })}}
                        />
                    </Animated.Image>
                    <PageHeader />
                    <AnimatedSectionList
                        sections={[{key: 1, title: `我创建的歌单`, data: [1]},]}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}
                        ListHeaderComponent={this.renderHeader}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY }}}],
                            { useNativeDriver: true }
                        )}
                        // onScrollAnimationEnd={() => {
                        //     this.img.setNativeProps({ blurRadius: scrollY.interpolate({
                        //         inputRange: [-height, 0, height],
                        //         outputRange: [0, 0, 2],
                        //         extrapolate: 'clamp',
                        //     }) });
                        // }}
                        renderSectionHeader={this.renderSectionHeader}
                        stickySectionHeadersEnabled
                        scrollEventThrottle={26}
                    />
                </View>
            </Spin>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImg: {
        width: screen.width,
        position: 'absolute',
        resizeMode: 'cover',
        backgroundColor: color.backgroundColor,
    },
    header: {
        height: height - screen.pageHeader,
        width,
        backgroundColor: 'transparent',
    },
    subBtn: {
        borderWidth: 1,
        borderColor: color.white,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {

    }
});

export default DjDetail;