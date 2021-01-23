import React, { useState, useEffect, useCallback } from 'react';
import { View, 
  Image, 
  Text,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import styles from './styles';

import Feather from 'react-native-vector-icons/Feather';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import logoImg from '../assets/logo.png';
import { Colors } from 'react-native-paper';

import UserConfirmScreen from './UserConfirm/UserConfirmScreen';
import ResultActionScreen from './ResultAction/ResultAction';

import * as botActions from '../../store/actions/bot';
import * as handleActions from '../../store/actions/handle';
import * as userActions from '../../store/actions/user';

const BotsSelectScreen = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [confirmedUser, setConfirmedUser] = useState(false);
  const [error, setError] = useState();
  const [botList, setBotList] = useState();
  const [userDetail, setUserDetail] = useState({});
  const [actioned, setActioned] = useState(false);
  const [response, setResponse] = useState({});
  const dispatch = useDispatch();

  const bfunction = props.navigation.getParam('function');
  const thandle = props.navigation.getParam('data');

  const loadBots = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await dispatch(botActions.getBotList());

      const bots = res.map((bot) => {return {...bot, selected: true}});
      setBotList(bots);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  const confirmHandle = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await dispatch(handleActions.confirmHandle(thandle));

      setUserDetail(res);

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setIsLoading, setError]);

  const confirmUser = () => {
    setIsLoading(true);
    setConfirmedUser(true);
    loadBots().then(() => {
      setIsLoading(false);
    });
  }

  const back = () => {
    props.navigation.pop()
  }

  useEffect(() => {
    setIsLoading(true);
    confirmHandle();
  }, [dispatch, confirmHandle]);

  useEffect(() => {
    if (error) {
      Alert.alert('Pempp!', error, [{ text: 'Ok',
      onPress: () => props.navigation.pop() }]);
    }
  }, [error]);

  function toggle(id){
    var test = botList.map((item) => {
      if(item.id === id){
        item.selected = !item.selected;
      }

      return item;
    });

    setBotList(test)
  }

  async function tweet(){
    var botSelected = botList.filter((bot) => bot.selected);
    botSelected = botSelected.map((bot) => bot.id);
    
    if(botSelected.length === 0){
      Alert.alert('Pempp!', 'Escolha ao menos um bot', [{ text: 'Ok' }]);
      return;
    }

    setIsLoading(true);

    try{
      let res;
      
      switch(bfunction){
        case 'follow':
          res = await dispatch(botActions.follow(botSelected, thandle));
          break;
        case 'like':
          res = await dispatch(botActions.like(botSelected, thandle));
          break;
        case 'retweet':
          res = await dispatch(botActions.retweet(botSelected, thandle));
      }

      dispatch(userActions.new_handle(thandle));
      setIsLoading(false);
      setResponse(res);
      setActioned(true);
    }catch(e){
      setError(e.message);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.contentCenter}>
        <ActivityIndicator size="large" color={Colors.blue200} />
      </View>);
  }

  if (!confirmedUser) {
    return (
    <UserConfirmScreen
    user={userDetail}
    back={back}
    confirmUser={confirmUser}
    />);
  }

  if (actioned) {
    return (
      <ResultActionScreen
      performed={response.performed}
      back={back}
      />);
  }

  return (
    <View style={styles.screen}> 
    <View style={styles.container}>
      <Image style={styles.imagem} source={logoImg}/>
      <View style={styles.headerList}>
        <Text style={{color: '#ffffff'}}>Escolha um ou mais bots 
          para realizar a ação {bfunction}>{thandle}</Text>
      </View>

      <FlatList 
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={botList}
        keyExtractor={botItem => botItem.handle}
        renderItem={(bot) => {
          bot = bot.item;

          return(
          <TouchableOpacity onPress={toggle.bind(this, bot.id)}>
            <View style={styles.listContainer}>
              <Image style={styles.profile} source={{ uri: bot.profileImage }} />
              <View style={styles.names}>
              <Text style={styles.nameProfile}>{bot.name}</Text>
              <Text >{bot.handle}</Text>
              </View>

              <Feather style = {styles.icon} name = {bot.selected ? "disc" : "circle"}
               size={16} color={!bot.selected ? "#657786" : "#1DA1F2"}/>
          
            </View>
          </TouchableOpacity>
        )}}
      />
      <View style={styles.actions}>
        <TouchableOpacity 
        style={styles.button} 
        onPress={tweet.bind(this)}
        >
          <Text style={styles.buttonText}>Prosseguir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ [styles.button, {backgroundColor: '#657786'}] }
        onPress={back.bind(this)}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );
};

export default BotsSelectScreen;
