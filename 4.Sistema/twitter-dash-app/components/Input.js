import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const Input = props => {
  let icon;

  if(props.icon){
    icon = <FontAwesome name={props.icon} style={styles.icon} size={15} color="grey" />
  }

  return (
  <View style={styles.inputContainer}>
    {icon}
    <TextInput 
      {...props} 
      style={{ ...styles.input, ...props.style }} 
      placeholder={props.placeholder}
    />
  </View>);
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  },
  icon: {
    paddingRight: -5
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Input;
