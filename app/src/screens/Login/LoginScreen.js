import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { View, 
  Image, 
  Text,
  KeyboardAvoidingView,
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

const LoginScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(inputReducer, {
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
      Alert.alert('Pempp!', error, [{ text: 'Tentar novamente' }]);
    }
  }, [error]);

  const loginHandler = async () => {
    if(isLoading) return;

    let action;

    action = authActions.signin(
      new User(0, formState.inputValues.email, formState.inputValues.password)
    );
    
    setError(null);
    setIsLoading(true);

    try{
      await dispatch(action);

      setIsLoading(false);
      props.navigation.navigate('App');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if(isLoading){
    return ( 
    <View style={styles.contentCenter}>
      <ActivityIndicator size="large" color={Colors.blue200} />
    </View>);
  }

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
            placeholder={'Senha'}
            secureTextEntry={true}
            errorText={'Senha incorreta'}
            onInputChange={inputChangeHandler}
            required
            />
          </View>
        
          <View style={styles.actions}>
            <View style={{opacity: (formState.formIsValid && !isLoading) ? 1.0 : 0.5}}>
              <TouchableOpacity 
                style={styles.button} 
                disabled={!formState.formIsValid && !isLoading}
                onPress={loginHandler}>

                <Text style={styles.buttonText}>{'Entrar'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={ [styles.button, {backgroundColor: '#657786'}] } 
            onPress={() => {props.navigation.navigate({
                routeName: 'Register' }); } }>
              <Text style={styles.buttonText}>{'Registrar'}</Text>
            </TouchableOpacity>
            <View style={styles.forgot}>
              <Text 
              style={{color: Colors.blue900, paddingTop: 10}} 
              onPress={() => {props.navigation.navigate({
                routeName: 'Forgot' }); }}>
                {'Esqueci a senha'}
              </Text>
            </View>

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
