import React from 'react';
import { 
  StyleSheet,
  SafeAreaView,
View } from 'react-native';
import { enableScreens } from 'react-native-screens';

import TdaNavigation from './src/navigation/TdaNavigation';

enableScreens();//Make sure all UI use native resources

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
        <TdaNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
