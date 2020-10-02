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


const RegisterScreen = props => {
  return (



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
          <Input 
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Confirmar senha"
            secureTextEntry={true}
          />
          </View>

          <View style={styles.actions}>
        
            <TouchableOpacity style={styles.button} onPress={() => {props.navigation.navigate({
                routeName: 'Begin' }); } }>

              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ [styles.button, {backgroundColor: '#657786'}] } onPress={() => {props.navigation.navigate({
                routeName: 'Login' });} }>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    
  );
};

export default RegisterScreen;
