import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import FollowScreen from '../screens/Follow/FollowScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import TweetScreen from '../screens/Tweet/TweetScreen';
import Colors from '../constants/Colors';

const TweetFollowTabNavigator = createBottomTabNavigator({
    Tweet: {
        screen: TweetScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="logo-twitter" size={25} color={tabInfo.tintColor} />
                );
            }
        }
    },
    Follow: {
        screen: FollowScreen,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="ios-person-add" size={25} color={tabInfo.tintColor} />
                )
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
})

const TdaNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Begin: {
        screen: TweetFollowTabNavigator
    }
}, {
    defaultNavigationOptions: {
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' }
    }
});

export default createAppContainer(TdaNavigator);
