import React from 'react';
import { 
  StyleSheet,
  SafeAreaView,
View } from 'react-native';
import { enableScreens } from 'react-native-screens';

import TdaNavigation from './navigation/TdaNavigation';

enableScreens();//Make sure all UI use native resources

export default function App() {
  return (
    <View style={styles.screen}>
        <TdaNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
