import React, {useReducer, useCallback, useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, Animated} from 'react-native';
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

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 150, y: 125}));

  useEffect(()=> {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    },

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 30,

      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
      }),

    ]).start();
  }, [Keyboard]);
  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 90,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 70,
        duration: 100,
      }),
    ]).start();
  }
  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 150,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 125,
        duration: 100,
      }),
    ]).start();
  }
  return (
    <TouchableWithoutFeedback style={styles.screen} onPress={() => Keyboard.dismiss()}>
      <View style={styles.screenComponent}>
        <Animated.Image style={{width: logo.x, height: logo.y, marginBottom: 10}} source={logoImg}/>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              opacity: opacity,
              transform: [
                {translateY: offset.y},
              ],
            },
          ]}
        >

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

        </Animated.View>

      </View>
    </TouchableWithoutFeedback>
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
