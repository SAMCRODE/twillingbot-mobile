/* eslint-disable react/display-name */
import React, {useCallback} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {DrawerItems} from 'react-navigation-drawer';
import {Linking, Button, View, Text, Image, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import BotsSelectScreen from '../screens/BotsList/BotsSelectScreen';
import FollowScreen from '../screens/Follow/FollowScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import Colors from '../constants/Colors';
import logoImg from '../../assets/samcrode.png';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';
import ForgotPassScreen from '../screens/ForgotPassword/ForgotPassScreen';
import CodeConfirmScreen from '../screens/CodeConfirm/CodeConfirmScreen';
import NewPassScreen from '../screens/NewPassword/NewPassScreen';
import RetweetScreen from '../screens/Retweet/RetweetScreen';
import LikeScreen from '../screens/LikeScreen/LikeScreen';
import ContributeScreen from '../screens/Contribute/ContributeScreen';

const FollowNavigator = createStackNavigator(
    {
      FollowSc: FollowScreen,
    },
);

const RetweetNavigator = createStackNavigator(
    {
      RetweetSc: RetweetScreen,
    },
);

const LikeNavigator = createStackNavigator(
    {
      LikeSc: LikeScreen,
    },
);

const TweetFollowTabNavigator = createBottomTabNavigator({
  Follow: {
    screen: FollowNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
        // <Text>icon</Text>
          <Ionicons name="person-add" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
  Retweet: {
    screen: RetweetNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
        // <Text>icon</Text>
          <Entypo name="retweet" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarOptions: {
        activeTintColor: Colors.greenRetweet,
      },
    },
  },
  Like: {
    screen: LikeNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
        // <Text>icon</Text>
          <Ionicons name="md-heart" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarOptions: {
        activeTintColor: Colors.redLike,
      },
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: Colors.accentColor,
  },
});

const AuthNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Forgot: {
    screen: ForgotPassScreen,
  },
  CodeConfirm: {
    screen: CodeConfirmScreen,
  },
  NewPass: {
    screen: NewPassScreen,
  },
}, {
  defaultNavigationOptions: {
    cardStyle: {backgroundColor: '#FFFFFF'},
    headerShown: false,
  },
});

const AppNavigator = createStackNavigator({
  Asdfasd: {
    screen: TweetFollowTabNavigator,
  },
  Bots: {
    screen: BotsSelectScreen,
  },
}, {
  defaultNavigationOptions: {
    cardStyle: {backgroundColor: '#FFFFFF'},
    headerShown: false,
  },
  navigationOptions: {
    drawerIcon: (drawerConfig) => (
      // <Text>icon</Text>
      <Ionicons
        name={'md-home'}
        size={23}
        color={drawerConfig.tintColor}
      />
    ),
  },
});

const OpenURLButton = ({url, title}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Erro ao abrir url: ${url}`);
    }
  }, [url]);

  return <Button title={title} onPress={handlePress} />;
};

const ContributeNavigator = createStackNavigator({
  Contribute: {
    screen: ContributeScreen,
  },
}, {
  defaultNavigationOptions: {
    cardStyle: {backgroundColor: '#FFFFFF'},
  },
});

const drawerNavigator = createDrawerNavigator(
    {
      Initial: {
        screen: AppNavigator,
        navigationOptions: {
          drawerLabel: 'Inicio',
        },
      },
      Contribute: {
        screen: ContributeNavigator,
        navigationOptions: {
          drawerLabel: 'Contribua',
          drawerIcon: (drawerConfig) => (
            // <Text>icon</Text>
            <Ionicons
              name={'git-branch-outline'}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        },
      },
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary,
      },
      contentComponent: (props) => {
        const dispatch = useDispatch();
        return (
          <View style={{flex: 1, paddingTop: 10}}>
            <View style={{flex: 1}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{width: '50%', height: '30%'}}
                  source={logoImg}/>
                <Text
                  style={{width: '70%', textAlign: 'center', color: '#B4C1D8'}}
                >&quot;That which doesn&apos;t compile
                makes you stronger&quot;</Text>
              </View>
              <DrawerItems {...props} />
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="code-slash"
                  size={25} color={Colors.blueTwitter}/>
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <Button
                title="Sair"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                }}
              />
            </View>
          </View>
        );
      },
    },
);

const TdaNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: {
    screen: AuthNavigator,
  },
  App: {
    screen: drawerNavigator,
  },
}, {
  defaultNavigationOptions: {
    cardStyle: {backgroundColor: '#FFFFFF'},
  },
});

export default createAppContainer(TdaNavigator);
