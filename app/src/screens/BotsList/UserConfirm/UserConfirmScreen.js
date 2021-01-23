import React from 'react';
import {View,
  Image,
  Text,
} from 'react-native';
import styles from './styles';

import logoImg from '../../assets/logo.png';
import {TouchableOpacity} from 'react-native-gesture-handler';

const UserConfirmScreen = (props) => {
  const confirmUser = () => {
    props.confirmUser();
  };
  const back = () => {
    props.back();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image style={styles.imagem} source={logoImg}/>
        <TouchableOpacity style={styles.user}>
          <View style={styles.userHeader}>
            <Text style={{color: '#ffffff', padding: 5}}>
              Confirme o usuário</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10, width: '80%'}}>
            <View>
              <Image
                style={styles.userPhoto}
                source={{uri: props.user.profile_image_url}}/>
            </View>
            <View style={{margin: 10}}>
              <Text>@{props.user.handle}</Text>
              <Text>{props.user.name}</Text>
              <Text>{props.user.description}</Text>
            </View>
          </View>
          {props.user.status &&
          <View style={styles.status}>
            <View style={styles.statusHeader}>
              <Text style={{color: '#ffffff', padding: 5}}>Último tweet:</Text>
            </View>
            <Text style={styles.statusText}>{props.user.status.text}</Text>
          </View>
          }
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={confirmUser.bind(this)}
          >
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ [styles.button, {backgroundColor: '#657786'}] }
            onPress={back.bind(this)}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserConfirmScreen;
