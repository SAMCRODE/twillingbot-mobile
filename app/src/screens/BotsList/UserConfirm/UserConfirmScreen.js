import React, { useState, useEffect, useCallback } from 'react';
import { View, 
  Image, 
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import styles from './styles';

import { TouchableOpacity } from 'react-native-gesture-handler';
import logoImg from '../../assets/logo.png';

const UserConfirmScreen = props => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState();
//   const [botList, setBotList] = useState();
//   const dispatch = useDispatch();

//   const bfunction = props.navigation.getParam('function');
//   const tdata = props.navigation.getParam('data');

//   const loadBots = useCallback(async () => {
//     // console.log('aqui!\n');
//     // setError(null);
//     // setIsLoading(true);
//     try {
//     //   const res = await dispatch(botActions.getBotList());
//     //   // console.log(res);
//     //   const bots = res.map((bot) => {return {...bot, selected: true}});
//     //   setBotList(bots);
//     //   setIsLoading(false);
//     } catch (err) {
//       // console.log(err.message.code, 'err a');
//     //   setIsLoading(false);
//     //   setError(err.message);
//     }
//   }, [dispatch, setIsLoading, setError]);

//   useEffect(() => {
//     // setIsLoading(true);
//     // loadBots().then(() => {
//     //   setIsLoading(false);
//     // });
//   }, [dispatch, loadBots]);

//   useEffect(() => {
//     // if (error) {
//     //   Alert.alert('Pempp!', error, [{ text: 'Ok' }]);
//     // }
//   }, [error]);

//   function toggle(id){
//     var test = botList.map((item) => {
//       if(item.id === id){
//         item.selected = !item.selected;
//       }

//       return item;
//     });

//     setBotList(test)
//   }

//   async function tweet(){
//     var botSelected = botList.filter((bot) => bot.selected);
//     botSelected = botSelected.map((bot) => bot.id);
    
//     if(botSelected.length === 0){
//       Alert.alert('Pempp!', 'Escolha ao menos um bot', [{ text: 'Ok' }]);
//       return;
//     }

//     setIsLoading(true);

//     try{
//       let res;
      
//       switch(bfunction){
//         case 'follow':
//           res = await dispatch(botActions.follow(botSelected, tdata));
//           break;
//         case 'like':
//           res = await dispatch(botActions.like(botSelected, tdata));
//           break;
//         case 'retweet':
//           res = await dispatch(botActions.retweet(botSelected, tdata));
//       }

//       dispatch(userActions.new_handle(tdata));
//       setIsLoading(false);
//       props.navigation.pop();
//     }catch(e){
//       setIsLoading(false);
//       setError(e.message);
//     }
//   }

//   if(isLoading){
//     return (
//       <View style={styles.contentCenter}>
//         <ActivityIndicator size="large" color={Colors.blue200} />
//       </View>);
//   }

  const confirmUser = () => {
    props.confirmUser();
  }

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
        onPress={() => {props.navigation.pop()} }>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );
};

export default UserConfirmScreen;
