import React from 'react';
import { 
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './src/store/reducers/auth';
import TdaNavigation from './src/navigation/TdaNavigation';

const rootReducer = combineReducers({
  auth: authReducer  
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

enableScreens();//Make sure all UI use native resources

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.screen}>
        <TdaNavigation />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
