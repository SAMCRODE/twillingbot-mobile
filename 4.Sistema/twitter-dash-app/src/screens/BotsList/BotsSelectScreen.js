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

class BotItem{
  constructor(id, handle, name){
    this.id = id;
    this.handle = handle;
    this.name = name;
    this.selected = false;
  }
};

const BotsSelectScreen = props => {
  return (
    <View style={styles.screen}>
    <View style={styles.container}>
      <Image style={styles.imagem} source={logoImg}/>


      <FlatList 
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={[new BotItem('0', 'leitecond', 'leitecond'), new BotItem('1', 'leitecond', 'leitecond')]}
        keyExtractor={botItem => botItem.id}
        renderItem={(bot) => {
          bot = bot.item;
          return(
          <TouchableOpacity onPress={() => {bot.selected = !bot.selected}}>
            <View style={styles.listContainer}>
              <Image style={styles.profile} source={profImg} />
              <View style={styles.names}>
              <Text style={styles.nameProfile}>{bot.name}</Text>
              <Text >@{bot.handle}</Text>
              </View>

              <Feather style = {styles.icon} name = "disc" size={16} color={!bot.selected ? "#818181" : "#000000"}/>
          
            </View>
          </TouchableOpacity>
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
