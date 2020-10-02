import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import logoImg from '../assets/logo.png';
import Input from '../../components/Input';

const FollowScreen = props => {
  return (
    <View style={styles.screen}>
    <Image style={styles.imagem} source={logoImg}/>


    <View style={styles.inputContainer}>

        <Text style={styles.title}>Digite o nome do usuário:</Text>

        <Input 
        style={styles.input}
        blurOnSubmit
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Usuário"
        />

        <View style={styles.actions} >
          <TouchableOpacity style={styles.buttonTweet} onPress={() =>{}}>
            <Text style={styles.buttonText}>Seguir</Text>
          </TouchableOpacity>
        </View>

    </View>


    </View>
  );
};
export default FollowScreen;
