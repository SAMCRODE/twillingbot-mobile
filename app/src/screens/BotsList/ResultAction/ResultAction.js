import React, {useEffect, useState} from 'react';
import {View,
  Image,
  Text,
  LayoutAnimation,
  Animated,
} from 'react-native';
import styles from './styles';

import logoImg from '../../assets/logo.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ResultActionScreen = (props) => {
  const [show, setShow] = useState(false);
  const back = () => {
    props.back();
  };

  const setAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
    });
  };
  useEffect(() => {
    setAnimation();
    setShow(true);
  });

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image style={styles.imagem} source={logoImg}/>
        <TouchableOpacity style={styles.user}>
          <View style={{width: '100%'}}>
            <View style={{margin: 5}}>
              {show &&
                <Animated.Text style={{fontSize: 40, textAlign: 'center'}}>
                  {props.performed}</Animated.Text>
              }
            </View>
          </View>
          <View style={styles.labelContainer}>
            <Text style={{color: '#ffffff'}}>Interações totais</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            style={ [styles.button, {backgroundColor: '#657786'}] }
            onPress={back.bind(this)}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResultActionScreen;
