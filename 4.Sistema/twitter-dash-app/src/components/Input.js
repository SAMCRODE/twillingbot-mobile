import React, { useReducer, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: !!props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    // console.log('vou chamar ? ', inputState.touched)
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    // console.log(text, 'eh o texto')
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    // console.log(isValid, 
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    // console.log('ON BLUR')
    dispatch({ type: INPUT_BLUR });
  };

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
      onChangeText={textChangeHandler}
      onEndEditing={lostFocusHandler}
    />
    {!!props.showError && !inputState.isValid && inputState.touched && (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{props.errorText}</Text>
      </View>
    )}
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
    paddingRight: 0
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    color: 'red',
    fontSize: 13
  }
});

export default Input;
