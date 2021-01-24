import React, {useReducer, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import HeaderButton from '../../components/UI/HeaderButton';
import logoImg from '../assets/logo.png';
import inputReducer, {FORM_INPUT_UPDATE} from '../../components/InputReducer';
import InputHandle from '../../components/InputHandle';
import Colors from '../../constants/Colors';

const LikeScreen = (props) => {
  const [formState, dispatchFormState] = useReducer(inputReducer, {
    inputValues: {
      handle: '',
    },
    inputValidities: {
      handle: false,
    },
    formIsValid: false,
  });

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

  const info = () => {
    Alert.alert(
        'Como usar',
        'Informe no campo o @ do usuario, por exemplo: @neymarjr',
        [{text: 'OK'}]);
  };

  return (
    <View style={styles.screen}>
      <Image style={styles.imagem} source={logoImg}/>


      <View style={styles.inputContainer}>

        <View style={styles.inputHeader}>
          <Text style={styles.title}>Digite o nome do usuário:</Text>
          <TouchableOpacity
            onPress={info.bind(this)}
            style={{backgroundColor: '#ffffff',
              borderRadius: 10}}>
            <Ionicons
              name={'md-help'}
              size={23}
              color={Colors.blueDark}
            />
          </TouchableOpacity>
        </View>

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
                props.navigation.navigate('Bots', {function: 'like',
                  data: formState.inputValues.handle});
              }}
              disabled={!formState.formIsValid}>
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>


    </View>
  );
};

LikeScreen.navigationOptions = (navData) => {
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
  };
};

export default LikeScreen;
