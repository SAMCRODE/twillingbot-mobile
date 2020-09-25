import React from 'react';
import { View, 
  StyleSheet, 
  Image, 
  Dimensions, 
  Button,
  Text
} from 'react-native';

import Colors from '../constants/Colors';
import Input from '../components/Input';

const LoginScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
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
          placeholder="email"
          icon="user" />
          <Input 
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="senha"
          icon="key"
          secureTextEntry={true} />
          <View style={styles.button}>
            <Button title={"Entrar"} style={styles.button} onPress={() => {
              console.log('pressed');

              props.navigation.navigate({
                routeName: 'Begin'
              });
            }}/>
          </View>
        </View>
        
      </View>
      <View style={styles.bottom}>
        <Text style={styles.textBottom}>Não tem uma conta? Cadastre-se</Text>
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    marginVertical: Dimensions.get('window').height / 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 50,
    overflow: 'visible'
  },
  image: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.3
  },
  input: {
    width: Dimensions.get('window').width * 0.8,
    paddingLeft: 5
  },
  button: {
    width: Dimensions.get('window').width * 0.8,
    marginTop: 30
  },
  bottom: {
    justifyContent: 'flex-end',
    backgroundColor: '#132743',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 20
  },
  textBottom: {
    color: 'white'
  }
});

export default LoginScreen;
