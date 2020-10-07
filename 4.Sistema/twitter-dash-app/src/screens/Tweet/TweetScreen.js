import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './styles';
import logoImg from '../assets/logo.png';

const TweetScreen = props => {
  const [tweet, setTweet] = useState('');
  
  return (
    <View style={styles.screen}>


      <Image style={styles.imagem} source={logoImg}/>

      <View style={styles.inputContainer}>
      <Text style={styles.title}>O que você está pensando?</Text>  
      <TextInput 
      onChangeText={(text) => setTweet(text)}
      style={styles.input}
      multiline = {true}
      numberOfLines = {3}
      maxLength={240}
      onFocus={false}
      autoCapitalize="none"
      autoCorrect={false}
      theme={{colors: {primary: '#1DA1F2', underlineColor: 'transparent'}}}
      />
      <View style={styles.actions} >
        <TouchableOpacity style={styles.buttonTweet} onPress={() => {
                  props.navigation.navigate('Bots', {function: 'tweet', data: tweet }); 
                }}>
          <Text style={styles.buttonText}>Tweetar</Text>
        </TouchableOpacity>
      </View>
      </View>
    	

    </View>
  );
};


export default TweetScreen;
[ ]