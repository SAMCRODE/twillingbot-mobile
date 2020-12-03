import React from 'react';
import { 
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './src/store/reducers/auth';
import NavigationContainer from './src/navigation/NavigationContainer';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const rootReducer = combineReducers({
  auth: authReducer  
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

enableScreens();//Make sure all UI use native resources

i18n.locale = Localization.locale;

i18n.translations = {
  en: { 
    Begin: 'Home',
    forgetPass: 'Forgot you pass ?', 
    register: 'Register',
    getIn: 'Enter',
    password: 'password',
    senhaErrorInput: 'Enter with a right password',
    confirmPassword: 'Confirm your password',
    back: 'Back',
    passwordMiss: 'The passwords are diferents',
    headerTweet: 'What comes in your mind ?',
    headerFollow: 'Type the username',
    exit: 'logout',
    follow: 'Follow',
    Begin: 'Home',
    AUTHWR: 'Email or password wrong',
    EMAILREP: 'Already there is a account for this email',
    TryAgain: 'Try Again',
    MissBots: 'You need to choose at least one bot'
  },
  pt: { 
    password: 'Senha',
    confirmPassword: 'Confirme a senha',
    getIn: 'Entrar',
    forgetPass: 'Esqueceu a senha ?',
    register: 'Cadastrar',
    passwordMiss: 'As senhas são divergentes',
    back: 'Voltar',
    headerTweet: 'O que você está pensando?',
    headerFollow: 'Digite o nome do usuário',
    exit: 'sair',
    follow: 'Seguir',
    Begin: 'Inicio',
    EMAILREP: 'Já temos uma conta cadastrada para esse email',
    AUTHWR: 'Email ou senha incorretos',
    TryAgain: 'Tentar novamente',
    MissBots: 'Escolha pelo menos um bot'
  },
};

i18n.fallbacks = true;

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.screen}>
        <NavigationContainer />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
