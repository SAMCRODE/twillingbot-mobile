import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 27,
  },
  screenComponent: {
    width:"100%",
    height: "105%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  imagem: {
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    marginBottom: 5,
  },
  inputContainer: {
    marginTop: 25,
    width: Dimensions.get('window').width * 0.80,
  },
  inputHeader: {
    flexDirection: 'row',
    padding: 2,
    width: '100%',
    justifyContent: 'space-between',
  },
  input: {
    width: Dimensions.get('window').width * 0.80,
    maxHeight: 95,
    fontSize: 20
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTweet: {
    width: 125,
    height: 50,
    marginTop: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 5,
    color: '#aaaaaa',
    textAlign: 'left',
  },
});
