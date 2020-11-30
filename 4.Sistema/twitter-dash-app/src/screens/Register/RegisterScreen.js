import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { View, 
  Image, 
  Text,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';

import Input from '../../components/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logoImg from '../assets/logo.png';
import inputReducer, { FORM_INPUT_UPDATE } from '../../components/InputReducer';
import * as authActions from '../../store/actions/auth';
import User from '../../models/user';
import { useDispatch } from 'react-redux';
import { Colors } from 'react-native-paper';
import i18n from 'i18n-js';

const RegisterScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (error) {
      Alert.alert('Pempp!', error, [{ text: 'Foi mau' }]);
    }
  }, [error]);

  const registerHandler = async () => {
    if(isLoading) return;

    let action;

    action = authActions.signup(
      new User(0, formState.inputValues.email, formState.inputValues.password)
    );
    
    setError(null);
    setIsLoading(true);

    try{
      await dispatch(action);
      setIsLoading(false);
      props.navigation.navigate('Login');
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  if(isLoading){
    return ( 
    <View style={styles.contentCenter}>
      <ActivityIndicator size="large" color={Colors.blue200} />
    </View>);
  }

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
            placeholder={i18n.t('password')}
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
            placeholder={i18n.t('confirmPassword')}
            secureTextEntry={true}
            errorText=""
            onInputChange={inputChangeHandler}
            required
          />
          {formState.inputValues.password !== formState.inputValues.confirmPassword && 
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{i18n.t('passwordMiss')}</Text>
          </View>}
        </View>

        <View style={styles.actions}>
          <View style={{opacity: (formState.formIsValid && !isLoading) ? 1.0 : 0.5}}>
            <TouchableOpacity 
            style={styles.button}
            onPress={registerHandler}
            disabled={!formState.formIsValid && !isLoading}
            >
              <Text style={styles.buttonText}>{i18n.t('register')}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={ [styles.button, {backgroundColor: '#657786'}] } 
            onPress={() => {props.navigation.navigate({
              routeName: 'Login' });} }>
            <Text style={styles.buttonText}>{i18n.t('back')}</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
