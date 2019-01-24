import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import React from 'react';

import ScreenUtil from '../base/ScreenUtil';
//登录相关
import Auth from '../modules/login/Auth';
import Login from '../modules/login/Login';
//首页
import Community from '../modules/home/Community';
import Shop from '../modules/home/Shop';
import Translate from '../modules/home/Translate';
import User from '../modules/home/User';
//图标
import { Icon } from '@ant-design/react-native';

//商城
const ShopNavigator = createStackNavigator({
    Shop: Shop
}, {
        initialRouteName: 'Shop'
    });

//翻译
const TranslateNavigator = createStackNavigator({
    Translate: Translate
}, {
        initialRouteName: 'Translate',
    });

//用户中心
const UserNavigator = createStackNavigator({
    User: User
}, {
        initialRouteName: 'User'
    });

//社区
const CommunityNavigator = createStackNavigator({
    Community: Community
}, {
        initialRouteName: 'Community'
    });

//底部导航栏
const HomeBottomTabNavigator = createBottomTabNavigator({
    TranslateNavigator: {
        screen: TranslateNavigator,
        navigationOptions: {
            tabBarIcon: <Icon name="home" size={ScreenUtil.scaleSize(40)} />,
            tabBarLabel: '翻译'
        }
    },
    CommunityNavigator: {
        screen: CommunityNavigator,
        navigationOptions: {
            tabBarIcon: <Icon name="rest" size={ScreenUtil.scaleSize(40)} />,
            tabBarLabel: '社区'
        }
    },
    ShopNavigator: {
        screen: ShopNavigator,
        navigationOptions: {
            tabBarIcon: <Icon name="shop" size={ScreenUtil.scaleSize(40)} />,
            tabBarLabel: '商城'
        }
    },
    UserNavigator: {
        screen: UserNavigator,
        navigationOptions: {
            tabBarIcon: <Icon name="user" size={ScreenUtil.scaleSize(40)} />,
            tabBarLabel: '我'
        }
    },
}, {
        initialRouteName: 'TranslateNavigator',
        backBehavior: 'none',
        tabBarOptions: {
            labelStyle: {
                fontSize: ScreenUtil.setSpText2(18)
            },
            activeBackgroundColor: 'red',
            activeTintColor: 'white'
        }
    });

const SwitchNavigator = createSwitchNavigator({
    HomeBottomTabNavigator: HomeBottomTabNavigator
}, {
        initialRouteName: 'HomeBottomTabNavigator',
    });

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;

