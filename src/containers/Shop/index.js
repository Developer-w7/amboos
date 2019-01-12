import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View , Text , FlatList, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground} from 'react-native'
import { Provider } from 'react-redux'
import store from '../../store'
import CustomButton from '../../components/CustomButton' 

import ShoppingCartIcon from './ShoppingCartIcon'


import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
/**
 * Just a centered logout button.
 */
const numColumns = 3;
var img1 = require('./images/Order-Groceries.jpg');
var img2 = require('./images/pepper.jpg');
var img3 = require('./images/lactaid.png');
var img4 = require('./images/wheat-in-a-sack.jpg');

class Shop extends Component {
 
  constructor(props) {
    super(props);
    this._getCategoriesFromApiAsync();
  }
  
  state = {
    Data:[]
    
  }
  static propTypes = {
    logout: PropTypes.func
  }
  _getCategoriesFromApiAsync=() => {
    return fetch('http://techfactories.com/test2/index.php?route=api/category&api_token=ef38c7aaa03fdecb94e1035cbd')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Data:responseJson.data})
        console.log(this.state.Data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  _renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
      <ImageBackground source={img2} style={{
    width:100,
    height: 100,
    
    alignSelf: 'center',
    resizeMode: 'contain',
  }}>
        
        </ImageBackground>
        <Text style={styles.itemText}>{item.name.toUpperCase()}</Text>
      </View>
    );
  };
  render () {
     
    return (
      <Provider store={store}>
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
      <FlatList
        data={this.state.Data}
        style={styles.container}
        renderItem={this._renderItem}
        numColumns={numColumns}
        scrollEnabled={false}
      />
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
      </Provider>
    )
  }
}


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





export default Shop;
