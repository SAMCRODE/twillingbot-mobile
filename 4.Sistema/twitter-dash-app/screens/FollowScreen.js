import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FollowScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Follow Screen</Text>
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

export default FollowScreen;
