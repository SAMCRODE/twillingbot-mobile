import React from 'react';
import { View, 
  Image, 
  Text
} from 'react-native';
import styles from './styles';

import {Feather} from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import logoImg from '../assets/logo.png';
import profImg from '../assets/bot.jpg';
const BotsSelectScreen = props => {
  return (
    <View style={styles.screen}>
    <View style={styles.container}>
      <Image style={styles.imagem} source={logoImg}/>


      <FlatList 
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4]}
        renderItem={() => {return(
          <View style={styles.listContainer}>
            <Image style={styles.profile} source={profImg} />
            <View style={styles.names}>
            <Text style={styles.nameProfile}>Rafaelzin</Text>
            <Text >@rafaelzcs</Text>
            </View>

          

            <Feather style = {styles.icon} name = "disc" size={16} color="#818181"/>
        
          </View>
        )}}
      />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => {} }>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ [styles.button, {backgroundColor: '#657786'}] } onPress={() => {} }>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>



    </View>
  </View>
  );
};
export default BotsSelectScreen;
