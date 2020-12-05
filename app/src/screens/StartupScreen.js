import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import * as userActions from '../store/actions/user';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Login');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, user } = transformedData;

      props.navigation.navigate('App');
      const handles = JSON.parse(await AsyncStorage.getItem('handles'));

      dispatch(authActions.authenticate(token, user));
      if(handles !== undefined && handles !== null)
        dispatch(userActions.init(handles));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
