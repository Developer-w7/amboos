import React, { Component } from "react";

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
import { StyleSheet, View , Text , FlatList, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'

import { withNavigation } from 'react-navigation';

import { cartItems,itemsFetchData,dropItems,removeItems} from '../../action';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
const numColumns = 1;

var img1 = require('./images/Order-Groceries.jpg');
var img2 = require('./images/pepper.jpg');
var img3 = require('./images/lactaid.png');
var img4 = require('./images/wheat-in-a-sack.jpg');




class CartScreen extends Component {
    constructor(props) {
    super(props);

    
  }
_processcart = (array) =>{
 const result = [...array.reduce((r, e) => {
  let k = `${e.product_id}|${e.product_name}`;
  if(!r.has(k)) r.set(k, {...e, count: 1})
  else r.get(k).count++
  return r;
}, new Map).values()]


return result;

//console.log(array);
}


_renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
        
      <View
        style={styles.item}
      >
     
     <Image
          style={{width: 50, height: 50}}
          source={{uri: item.thumb}}
        />
        <Text style={styles.itemText}>{item.product_name.toUpperCase()}</Text>
         <Text style={styles.count}>{item.count} </Text>
         <TouchableOpacity onPress={() => this.props.addItemToCart({"product_id":item.product_id,"product_name":item.product_name,"thumb":item.thumb})} style={{flex: 1}} ><Icon   name="md-add" size={20} /></TouchableOpacity> 
         <TouchableOpacity onPress={() => this.props.dropItemFromCart({"product_id":item.product_id})} style={{flex: 1}}><Icon  name="md-remove" size={20} /></TouchableOpacity>
         <TouchableOpacity onPress={() => this.props.removeItem({"product_id":item.product_id})} style={{flex: 1}}><Icon  name="md-close" size={20} /></TouchableOpacity>
       
      
        
      </View>
  
    );
  };
    render() {
        //console.log(this.props.cartItems);
        return (
            <View style={styles.container}>
           
                 <FlatList
        data={this._processcart(this.props.cartItems)}
        style={styles.container}
        renderItem={this._renderItem}
        numColumns={numColumns}
        scrollEnabled={true}
         keyExtractor={(item, index) => index.toString()}
      />
    
            </View>
        );
    }
}

const mapStateToProps = (state) => {
  console.log(state);
    return {
        cartItems: state.cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
       addItemToCart: (product) => dispatch(cartItems(product , 'ADD_TO_CART')),
       dropItemFromCart: (product_id) => dispatch(dropItems(product_id , 'DROP_ITEM_FROM_CART')),
       removeItem: (product_id) => dispatch(removeItems(product_id , 'REMOVE_FROM_CART'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1
   
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
    flex: 1,
    flexDirection: 'row',
    margin: 1,
    height: 70, // approximate a square
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
    flex:5
  },
  count:{
color: 'red',
    fontWeight: 'normal',
    fontSize:18,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex:3
  },
  contentContainer: {
    paddingVertical: 0
  },
})

  // <TouchableOpacity onPress={() => this.props.removeItem({"product_id":item.product_id})} style={{flex: 1}}><Icon  name="md-close" size={20} /></TouchableOpacity>