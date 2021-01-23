import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './src/store/reducers/auth';
import userReducer from './src/store/reducers/user';
import NavigationContainer from './src/navigation/NavigationContainer';
import {UIManager} from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

enableScreens();// Make sure all UI use native resources

// eslint-disable-next-line require-jsdoc
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.screen}>
        <NavigationContainer />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
