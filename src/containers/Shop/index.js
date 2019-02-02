import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View , Text , FlatList, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation'
import CustomButton from '../../components/CustomButton' 
import { connect } from 'react-redux'
import Categories from './Categories'


import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
/**
 * Just a centered logout button.
 */
const numColumns = 3;
const slides = [
  {
    image: require('./images/Order-Groceries.jpg'),
    imageWidth:  Dimensions.get('window').width,
    imageHeight: 250,
    title: 'Hello World',
    subtitle: 'This is a beautiful world',
    titleColor: '#fff',
    subtitleColor: '#fff',
    resizeMode: 'cover'
  },
  {
    image: require('./images/Order-Groceries.jpg'),
    imageWidth:  Dimensions.get('window').width,
    imageHeight: 250,
    title: 'Bye World',
    subtitle: 'This is a see you soon',
    titleColor: '#fff',
    subtitleColor: '#fff',
    resizeMode: 'cover'
  }
];
var img1 = require('./images/Order-Groceries.jpg');
var img2 = require('./images/pepper.jpg');
var img3 = require('./images/lactaid.png');
var img4 = require('./images/wheat-in-a-sack.jpg');

class Shop extends Component {
 
  constructor(props) {
    super(props);
 
  }
  static navigationOptions={
drawerIcon:()=>(
  <Icon style={{fontSize:24,color:"#000" }} name="ios-home" />
  )
  }
 
  static propTypes = {
    logout: PropTypes.func
  }

  render () {
 
    return (
     
        <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
        <StatusBar
     backgroundColor="#1D4B98"
     barStyle="light-content"
    
   />
      <View style={styles.container}>
        <Image source={img1} style={{
    width: Dimensions.get('window').width,
    height: 250,
    
    alignSelf: 'center',
    resizeMode: 'cover',
  }}/>
 
      <Categories/>
   </View>
   <View style={{flexDirection:"row",flex:1}}>
   <Image source={img4} style={{
    width:180,
    height: 180,
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'cover',
  }}/>
   
   </View>
   </ScrollView>
      </SafeAreaView>
      
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}

export default connect(null, mapDispatchToProps)(withNavigation(Shop));
const styles = StyleSheet.create({
  container: {
    flex: 1,
 
   
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#000',
    fontWeight: 'normal',
    fontSize:10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingVertical: 0
  },
})






