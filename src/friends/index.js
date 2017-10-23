/**
 * Created by 叶子 on 2017/8/20.
 */
import React, { PureComponent } from 'react';
import { Text, SectionList, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { screen, color } from '../utils';
import { TextTool, VerticalSeparator, EventItem } from '../widgets';
import { FRIENDS_EVENT } from '../api';

const { H3, H4, Tip, Normal } = TextTool;

class Friends extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerLeft: <Icon name="ios-person-add-outline" size={30} color={color.white} />,
        headerRight: <Icon name="ios-stats-outline" size={30} color={color.white} />,
        // header: (
        //     <View style={{flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-between'}}>
        //         <Icon name="ios-person-add-outline" size={30} color={color.white} />
        //         <Icon name="ios-stats-outline" size={30} color={color.white} />
        //     </View>
        // ),
        headerStyle: {
            backgroundColor: color.theme,
            paddingHorizontal: 20
        }
    });
    state = {
        refreshing: true,
        event: []
    };
    componentWillMount() {
        this.fetchData();
    }
    fetchData = () => {
        (
            async () => {
                try {
                    // const res = await fetch(FRIENDS_EVENT);
                    // const { event } = await res.json();
                    const res = await fetch('http://192.168.3.69:3004/event');
                    const event = await res.json();
                    console.log(event);
                    this.setState({event, refreshing: false});
                } catch (err) {
                    alert(err);
                }
            }
        )();
    };
    renderHeader = () => (
        <View style={{paddingVertical: 15, paddingLeft: 10, backgroundColor: color.backgroundColor}}>
            <Normal>热门话题 ></Normal>
            <ScrollView
                horizontal
                alwaysBounceHorizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 10}}
            >
                <Image key="1" source={require('../imgs/img/18894007811887644.jpg')} style={{height: screen.width/6, width: screen.width*0.35, marginRight: 5}}>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Normal color={color.white}>#入秋#</Normal>
                    </View>
                </Image>
                <Image key="2" source={require('../imgs/img/18894007811887644.jpg')} style={{height: screen.width/6, width: screen.width*0.35, marginRight: 5}}/>
                <Image key="3" source={require('../imgs/img/18894007811887644.jpg')} style={{height: screen.width/6, width: screen.width*0.35, }}/>
            </ScrollView>
        </View>
    );
    renderItem = ({item}) => (
        <EventItem data={item} />
    );
    render() {
        const { refreshing, event } = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 40, backgroundColor: color.backgroundColor, marginBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="ios-create-outline" size={30} />
                        <H4 style={{marginLeft: 10}}>发动态</H4>
                    </View>
                    <VerticalSeparator />
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name="ios-videocam-outline" size={30} />
                        <H4 style={{marginLeft: 10}}>发布视频</H4>
                    </View>
                </View>
                <FlatList
                    data={event}
                    refreshing={refreshing}
                    onRefresh={this.fetchData}
                    keyExtractor={(item, index) => index}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderItem}
                    ListFooterComponent={() => <Text style={{textAlign: 'center', padding: 10, transform: [{scale: 0.857143}]}}>已加载完全部数据</Text>}
                />
            </View>
        )
    }
}

export default Friends;