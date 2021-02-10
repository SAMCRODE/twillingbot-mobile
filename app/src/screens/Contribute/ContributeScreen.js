/* eslint-disable react/display-name */
import React, {useCallback} from 'react';
import {Alert, Linking, View, Text, Image} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import HeaderButton from '../../components/UI/HeaderButton';

import logoImg from '../../../assets/samcrode.png';

import styles from './styles';
import Colors from '../../constants/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ContributeScreen = (props) => {
  const url = 'https://github.com/SAMCRODE/mobile';
  const openURL = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Erro ao abrir url: ${url}`);
    }
  }, [url]);

  return (
    <View style={styles.container}>
      <Image
        style={{width: '100%', height: '15%'}}
        source={logoImg}/>
      <Text>&quot;That which doesn&apos;t compile
                makes you stronger&quot;</Text>
      <View style={{width: '80%', justifyContent: 'center',
        alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons
            name="beer-outline"
            size={25} color={Colors.blueTwitter}/>
          <Text style={{textAlign: 'justify'}}>Achas que é capaz de
          contribuir com essa caneca ? acesse nosso repositório, crie uma
          issue</Text>
        </View>
      </View>
      <View style={{width: '80%', justifyContent: 'center',
        alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="code-slash"
            size={25} color={Colors.blueTwitter}/>
          <Text style={{textAlign: 'center'}}>Dev, quer colaborar?,
          mande um PR no nosso repo</Text>
        </View>
      </View>
      <View style={{width: '80%', justifyContent: 'center',
        alignItems: 'center'}}>
        <TouchableOpacity
          onPress={openURL.bind(this)}
          style={{flexDirection: 'row',
            borderRadius: 5,
            backgroundColor: Colors.blueDark, padding: 10}}>
          <AntDesign
            name="codesquareo"
            size={25} color={Colors.white}/>
          <Text style={{color: Colors.white}}>Repositório</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '80%', justifyContent: 'center',
        alignItems: 'center'}}>
        <Ionicons name="mail-outline"
          size={25} color={Colors.blueTwitter}/>
        <Text>trillingbot@gmail.com</Text>
      </View>
    </View>
  );
};

ContributeScreen.navigationOptions = (navData) => {
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

export default ContributeScreen;
