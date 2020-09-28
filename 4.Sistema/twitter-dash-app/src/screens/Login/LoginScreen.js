import React from 'react';
import { View, 
  StyleSheet, 
  Image, 
  Dimensions, 
  Button,
  Text
} from 'react-native';
import styles from './styles';

import Colors from '../../constants/Colors';
import Input from '../../components/Input';

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


export default LoginScreen;
