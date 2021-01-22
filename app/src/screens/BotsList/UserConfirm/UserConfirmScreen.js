/* eslint-disable no-invalid-this */
/* eslint-disable react/prop-types */
import React from 'react';
import {View,
  Image,
  Text,
} from 'react-native';
import styles from './styles';

import {TouchableOpacity} from 'react-native-gesture-handler';

const UserConfirmScreen = (props) => {
  const confirmUser = () => {
    props.confirmUser();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View>
            <Image
              style={styles.imagem}
              source={{uri: 'https://pbs.twimg.com/profile_images/1246847704556359681/HP8O5_fB_400x400.jpg'}}/>

          </View>
          <View style={{margin: 10}}>
            <Text>@Menotti</Text>

            <Text>Cesar Menotti</Text>

            <Text>1.1M Followers</Text>
          </View>
        </View>

        <Text>Esse é realmente o usuário ?</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={confirmUser.bind(this)}
          >
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ [styles.button, {backgroundColor: '#657786'}] }
            onPress={() => {
              props.navigation.pop();
            } }>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserConfirmScreen;
