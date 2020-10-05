import React, { useReducer, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import logoImg from '../assets/logo.png';
import Input from '../../components/Input';
import inputReducer, { FORM_INPUT_UPDATE } from '../../components/InputReducer';

const FollowScreen = props => {
  const [formState, dispatchFormState] = useReducer(inputReducer, {
    inputValues: {
      handle: ''
    },
    inputValidities: {
      handle: false
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <View style={styles.screen}>
    <Image style={styles.imagem} source={logoImg}/>


    <View style={styles.inputContainer}>

        <Text style={styles.title}>Digite o nome do usuário:</Text>

        <Input 
        id="handle"
        style={styles.input}
        blurOnSubmit
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="@handle"
        onInputChange={inputChangeHandler}
        required
        />

        <View style={styles.actions} >
          <View style={{opacity: formState.formIsValid ? 1.0 : 0.5}}>
            <TouchableOpacity 
            style={styles.buttonTweet} 
            onPress={() => {
              props.navigation.navigate({routeName: 'Bots' }); 
            }}
            disabled={!formState.formIsValid}>
              <Text style={styles.buttonText}>Seguir</Text>
            </TouchableOpacity>
          </View>
        </View>

    </View>


    </View>
  );
};
export default FollowScreen;
