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
import inputReducer, { FORM_INPUT_UPDATE } from '../../components/InputReducer';

const RegisterScreen = props => {
  const [formState, dispatchFormState] = useReducer(inputReducer, {
    inputValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    inputValidities: {
      email: false,
      password: false,
      confirmPassword: false
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
            <Input
              id="confirmPassword" 
              style={styles.input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Confirme a senha"
              secureTextEntry={true}
              errorText=""
              onInputChange={inputChangeHandler}
              required
            />
            {formState.inputValues.password !== formState.inputValues.confirmPassword && 
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>As senhas são divergentes</Text>
            </View>}
          </View>

          <View style={styles.actions} style={{opacity: formState.formIsValid ? 1.0 : 0.5}}>
        
            <TouchableOpacity style={styles.button}
              onPress={() => {props.navigation.navigate({
                routeName: 'Begin' }); } 
            }>

              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ [styles.button, {backgroundColor: '#657786'}] } 
              onPress={() => {props.navigation.navigate({
                routeName: 'Login' });} }>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
  );
};

export default RegisterScreen;
