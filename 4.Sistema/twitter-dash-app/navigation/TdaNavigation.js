import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import BotsSelectScreen from '../screens/BotsSelectScreen';
import FollowScreen from '../screens/FollowScreen';
import LoginScreen from '../screens/LoginScreen';
import TweetScreen from '../screens/TweetScreen';
import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen
    }
}, {
    defaultNavigationOptions: {
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' }
    }
});

export default createAppContainer(MealsNavigator);
