/**
 * Created by 叶子 on 2017/8/20.
 */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import DiscoverMusic from './discovermusic';
import MyMusic from './mymusic';
import Account from './account';
import Friends from './friends';
import PlayerScene from './player/PlayerScene';
import { ModalRoute } from './widgets';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer';
import Player from './player/Player';
import { DetailScene, MvDetail, UserDetail, DjDetail } from './detail';

const store = createStore(reducer);
console.log(store.getState());

const Tab = TabNavigator(
    {
        DiscoverMusic: {
            screen:  DiscoverMusic,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '发现音乐',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="ios-disc-outline" size={30} color={tintColor} />
                )
            })
        },
        MyMusic: {
            screen: MyMusic,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '我的音乐',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="ios-musical-notes-outline" size={30} color={tintColor} />
                )
            })
        },
        Friends: {
            screen: Friends,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '朋友',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="ios-contacts-outline" size={30} color={tintColor} />
                )
            })
        },
        Account: {
            screen: Account,
            navigationOptions: {
                tabBarLabel: '账号',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="ios-person-outline" size={30} color={tintColor} />
                )
            }
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        initialRouteName: 'DiscoverMusic',
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#ffffff',
            inactiveTintColor: '#cccccc',
            style: {
                backgroundColor: '#333333'
            }
        }
    }
);

const Navigator = StackNavigator(
    {
        Tab: { screen: Tab},
        Detail: { screen: DetailScene},
        Player: { screen: PlayerScene},
        MvDetail: {screen: MvDetail},
        UserDetail: {screen: UserDetail},
        DjDetail: {screen: DjDetail},
    },
    {
        navigationOptions: {
            headerBackTitle: '返回',
            headerTintColor: '#333333',
            showIcon: true
        }
    }
);

const ModalNavigator = StackNavigator(
    {
        MainNavigator: { screen: Navigator },
        ModalMenu: { screen: ModalRoute},
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

class RootScene extends PureComponent {
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    {/*<Navigator />*/}
                    <ModalNavigator />
                    <Player />
                </View>
            </Provider>
        )
    }
}

export default RootScene;