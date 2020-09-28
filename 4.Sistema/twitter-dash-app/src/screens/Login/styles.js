import {StyleSheet, Dimensions} from 'react-native';

import Constants from 'expo-constants';

export default StyleSheet.create({
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
})