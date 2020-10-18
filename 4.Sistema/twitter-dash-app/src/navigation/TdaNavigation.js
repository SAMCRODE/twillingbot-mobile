import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import BotsSelectScreen from '../screens/BotsList/BotsSelectScreen';
import FollowScreen from '../screens/Follow/FollowScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import TweetScreen from '../screens/Tweet/TweetScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import Colors from '../constants/Colors';
import { createDrawerNavigator } from 'react-navigation-drawer';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';

const TweetNavigator = createStackNavigator(
    {
        TweetSc: TweetScreen
    }

);

const FollowNavigator = createStackNavigator(
    {
        FollowSc: FollowScreen
    }
);

const TweetFollowTabNavigator = createBottomTabNavigator({
    Tweet: {
        screen: TweetNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="logo-twitter" size={25} color={tabInfo.tintColor} />
                );
            }
        }
    },
    Follow: {
        screen: FollowNavigator,
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

const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Register: {
        screen: RegisterScreen
    }
}, {
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerShown: false
    }
});

const AppNavigator = createStackNavigator({
    Asdfasd: {
        screen: TweetFollowTabNavigator
    },
    Bots: {
        screen: BotsSelectScreen
    }
}, {
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: '#FFFFFF' },
        headerShown: false
    },
    navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={'md-home'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
});

const drawerNavigator = createDrawerNavigator(
    {
        Initial: {
            screen: AppNavigator,
            navigationOptions: {
                drawerLabel: 'Inicio'
            }
        }
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary
      },
      contentComponent: props => {
        const dispatch = useDispatch();
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItems {...props} />
              <Button
                title="Sair"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }
    }
);

const TdaNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: drawerNavigator
    },
}, {
    defaultNavigationOptions: {
        cardStyle: { backgroundColor: '#FFFFFF' }
    }
});

export default createAppContainer(TdaNavigator);
