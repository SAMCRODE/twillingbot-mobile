import React, {useReducer, useCallback, useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';

import Input from '../../components/Input';
import {TouchableOpacity} from 'react-native-gesture-handler';
import logoImg from '../assets/logo.png';
import inputReducer, {FORM_INPUT_UPDATE} from '../../components/InputReducer';
import {useDispatch} from 'react-redux';
import {Colors} from 'react-native-paper';
import * as authActions from '../../store/actions/auth';

const NewPassScreen = (props) => {
  const {email, code} = props.navigation.state.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(inputReducer, {
    inputValues: {
      password: '',
    },
    inputValidities: {
      password: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();

  const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier,
        });
      },
      [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Pempp!', error, [{text: 'Foi mau'}]);
    }
  }, [error]);

  const codeConfirmHandler = async () => {
    if (isLoading) return;

    let action;

    action = authActions.redefinePass(
        email,
        code,
        formState.inputValues.password,
    );

    setError(null);
    setIsLoading(true);

    try {
      await dispatch(action);

      setIsLoading(false);
      props.navigation.navigate('Login', {
        email: email,
        code: formState.inputValues.code,
      });
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
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
            id="password"
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Nova senha"
            onInputChange={inputChangeHandler}
            required
            errorText="Coloque uma senha válida"
          />
        </View>

        <View style={styles.actions}>
          <View
            style={{opacity:
            (formState.formIsValid && !isLoading) ? 1.0 : 0.5}}>
            <TouchableOpacity
              style={styles.button}
              disabled={!formState.formIsValid && !isLoading}
              onPress={codeConfirmHandler}>

              <Text style={styles.buttonText}>Alterar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

export default NewPassScreen;
