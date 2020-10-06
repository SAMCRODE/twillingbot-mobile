import React, { useState } from 'react';
import { View, 
  Image, 
  Text
} from 'react-native';
import styles from './styles';

import {Feather} from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import logoImg from '../assets/logo.png';
import profImg from '../assets/bot.jpg';
import { Colors } from 'react-native-paper';

class BotItem{
  constructor(id, handle, name){
    this.id = id;
    this.handle = handle;
    this.name = name;
    this.selected = false;
  }
};

const BotsSelectScreen = props => {
  const [botList, setBotList] = useState([new BotItem('0', 'asdfasd', 'leited'), 
    new BotItem('1', 'leitecond', 'leitecond')]);

  function toggle(id){
    // console.log(botList);

    var test = botList.map((item) => {
      if(item.id === id){
        item.selected = !item.selected;
      }

      return item;
    });

    // console.log(test, 'asdfasd');
    setBotList(test)
  }

  return (
    <View style={styles.screen}>
    <View style={styles.container}>
      <Image style={styles.imagem} source={logoImg}/>


      <FlatList 
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={botList}
        keyExtractor={botItem => botItem.id}
        renderItem={(bot) => {
          // console.log(bot);
          // console.log('atualizando!\n');
          bot = bot.item;
          return(
          <TouchableOpacity onPress={toggle.bind(this, bot.id)}>
            <View style={styles.listContainer}>
              <Image style={styles.profile} source={profImg} />
              <View style={styles.names}>
              <Text style={styles.nameProfile}>{bot.name}</Text>
              <Text >@{bot.handle}</Text>
              </View>

              <Feather style = {styles.icon} name = {bot.selected ? "disc" : "circle"}
               size={16} color={!bot.selected ? "#657786" : "#1DA1F2"}/>
          
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
