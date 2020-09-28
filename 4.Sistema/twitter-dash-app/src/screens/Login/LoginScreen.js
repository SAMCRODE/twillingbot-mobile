import React from 'react';
import { View, 
  Image, 
  Text,
  KeyboardAvoidingView
} from 'react-native';
import styles from './styles';

import Input from '../../components/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logoImg from '../assets/logo.png';


const LoginScreen = props => {
  return (

    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style = {styles.screen}>

      <View style={styles.screen}>
        <View style={styles.container}>
          <Image style={styles.imagem} source={logoImg}/>

          <View style={styles.inputContainer}>
            <Input 
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
            />
            <Input 
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Senha"
            secureTextEntry={true}
          />
          </View>

          <View style={styles.actions}>
        
            <TouchableOpacity style={styles.button} onPress={() => {props.navigation.navigate({
                routeName: 'Begin' }); } }>

              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ [styles.button, {backgroundColor: '#818181'}] } onPress={()=>{}}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
