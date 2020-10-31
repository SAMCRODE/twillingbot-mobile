import React, { useCallback } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { DrawerItems } from 'react-navigation-drawer';
import { Linking, Button, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import BotsSelectScreen from '../screens/BotsList/BotsSelectScreen';
import FollowScreen from '../screens/Follow/FollowScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import Colors from '../constants/Colors';
import { createDrawerNavigator } from 'react-navigation-drawer';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';
import ForgotPassScreen from '../screens/ForgotPassword/ForgotPassScreen';
import CodeConfirmScreen from '../screens/CodeConfirm/CodeConfirmScreen';
import NewPassScreen from '../screens/NewPassword/NewPassScreen';
import RetweetScreen from '../screens/Retweet/RetweetScreen';
import LikeScreen from '../screens/LikeScreen/LikeScreen';

const FollowNavigator = createStackNavigator(
    {
        FollowSc: FollowScreen
    }
);

const RetweetNavigator = createStackNavigator(
    {
        RetweetSc: RetweetScreen
    }
)

const LikeNavigator = createStackNavigator(
    {
        LikeSc: LikeScreen
    }
)

const TweetFollowTabNavigator = createBottomTabNavigator({
    Follow: {
        screen: FollowNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="ios-person-add" size={25} color={tabInfo.tintColor} />
                )
            }
        }
    },
    Retweet: {
        screen: RetweetNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Entypo name="retweet" size={25} color={tabInfo.tintColor} />
                )
            },
            tabBarOptions: {
                activeTintColor: Colors.greenRetweet
            }
        }
    },
    Like: {
        screen: LikeNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="md-heart" size={25} color={tabInfo.tintColor} />
                )
            },
            tabBarOptions: {
                activeTintColor: Colors.redLike
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
    },
    Forgot: {
        screen: ForgotPassScreen
    },
    CodeConfirm: {
        screen: CodeConfirmScreen
    },
    NewPass: {
        screen: NewPassScreen
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

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Erro ao abrir url: ${url}`);
      }
    }, [url]);
  
    return <Button title={children} onPress={handlePress} />;
};

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
          <View style={{ flex: 1, paddingTop: 60 }}>
              <View style={{flex: 1}}>
                <DrawerItems {...props} />
                <View style={{paddingTop: 10}}>
                <OpenURLButton url={'https://github.com/rafaelcsva/Twilling-Bot'}>
                    repositório git</OpenURLButton>
                <Text style={{textAlign: 'center'}}>
                    Contribuidores: [Rafaelcs, Matheusvdl]</Text>
                </View>
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                
                <Button
                    title="Sair"
                    color={Colors.primary}
                    onPress={() => {
                    dispatch(authActions.logout());
                    // props.navigation.navigate('Auth');
                    }}
                    
                />
              </View>
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
