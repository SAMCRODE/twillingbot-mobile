import React, { useReducer, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import styles from './styles';
import HeaderButton from '../../components/UI/HeaderButton';
import logoImg from '../assets/logo.png';
import Input from '../../components/Input';
import inputReducer, { FORM_INPUT_UPDATE } from '../../components/InputReducer';
import InputHandle from '../../components/InputHandle';

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
        <Text style={styles.subtitle}>os bots seguirão o usuário especificado</Text>

        <InputHandle 
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
              props.navigation.navigate('Bots', {function: 'follow', 
              data: formState.inputValues.handle }); 
            }}
            disabled={!formState.formIsValid}>
              <Text style={styles.buttonText}>{i18n.t('follow')}</Text>
            </TouchableOpacity>
          </View>
        </View>

    </View>


    </View>
  );
};

FollowScreen.navigationOptions = navData => {

  return {
    headerTitle: '',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={'md-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Add"
    //       iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
    //       onPress={() => {
    //         navData.navigation.navigate('EditProduct');
    //       }}
    //     />
    //   </HeaderButtons>
    // )
  };
};

export default FollowScreen;
