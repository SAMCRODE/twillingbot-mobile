import React, { useReducer, useCallback } from 'react';
import { View, 
  Image, 
  Text,
  KeyboardAvoidingView
} from 'react-native';
import styles from './styles';

import Input from '../../components/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logoImg from '../assets/logo.png';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    // console.log(updatedValidities);
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const LoginScreen = props => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
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

    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.screen}>

      <View style={styles.screen}>
        <View style={styles.container}>
          <Image style={styles.imagem} source={logoImg}/>

          <View style={styles.inputContainer}>
            <Input 
            id="email"
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            email
            onInputChange={inputChangeHandler}
            required
            errorText="Coloque um email válido"
            />
            <Input
            id="password" 
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Senha"
            secureTextEntry={true}
            errorText="Insira com uma senha"
            onInputChange={inputChangeHandler}
            required
            />
          </View>

          <View style={styles.actions}>
            <View style={{opacity: formState.formIsValid ? 1.0 : 0.5}}>
              <TouchableOpacity 
                style={styles.button} 
                disabled={!formState.formIsValid}
                onPress={() => {
                  props.navigation.navigate({routeName: 'Begin' }); 
                }}>

                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={ [styles.button, {backgroundColor: '#818181'}] } onPress={()=>{}}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
