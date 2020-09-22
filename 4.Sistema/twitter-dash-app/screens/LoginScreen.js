import React from 'react';
import { View, 
  StyleSheet, 
  Image, 
  Dimensions, 
  Button } from 'react-native';

import Input from '../components/Input';

const LoginScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image 
          source={{
            uri: 'https://cdn.discordapp.com/attachments/746021348232659078/758008152989106176/vdL_1_1.png'
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.inputContainer}>
          <Input 
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          placeholder="email"
          icon="user" />
          <Input 
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          placeholder="senha"
          icon="key" />
          <View style={styles.button}>
            <Button title={"Entrar"} style={styles.button}/>
          </View>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: '50%',
    height: '50%',
    justifyContent: 'flex-end'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.4,
    marginVertical: Dimensions.get('window').height / 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 50
  },
  image: {
    width: '100%',
    height: '30%'
  },
  input: {
    width: Dimensions.get('window').width * 0.5,
    paddingLeft: 5
  },
  button: {
    width: Dimensions.get('window').width * 0.5,
    marginTop: 30
  }
});

export default LoginScreen;
