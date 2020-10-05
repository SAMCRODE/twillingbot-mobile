import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#E1E8ED',
      },
      container: {
        flex: 1,
        width: Dimensions.get('window').width,
        marginVertical: Dimensions.get('window').height / 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 50,
      },
      imagem:{
        marginBottom: 10
      },
      nameProfile:{
        fontSize: 19,
      },
      icon:{
        marginLeft: 45
      },
      listContainer: {
        margin: 5,
        height: 75,
        padding: 10,
        width: Dimensions.get('window').width * 0.70,
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 50
      },
      profile:{
        height: 65,
        width: 65,
        borderRadius: 100
      },
      actions:{
        display: 'flex',
        marginTop:15
      },
      button: {
        width: 195,
        height: 35,
        marginTop: 10,
        backgroundColor: '#1DA1F2',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: 'center'

      },
      buttonText:{
        color: '#fff',
        fontWeight: 'bold'
      }
})