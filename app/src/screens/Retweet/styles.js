import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  screen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8FA',
    paddingTop: 27
 },
 imagem:{
     marginBottom: 25
 },
  title:{
    fontSize: 15,
    marginBottom: 5
  },
  inputContainer:{
    marginTop: 25
  },
  input: {
    width: Dimensions.get('window').width * 0.80,
    maxHeight: 95
  },
  actions:{
    flexDirection: 'row-reverse'
  },
  buttonTweet: {
    width: 105,
    height: 35,
    marginTop: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#fff',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 5,
    color: '#aaaaaa'
  }
});