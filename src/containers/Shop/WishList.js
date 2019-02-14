import React, { Component } from "react";

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
import { StyleSheet, View , Text , FlatList, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'

import { withNavigation } from 'react-navigation';

import { addwishItems,clearwishList,cartItems,getwishListItems} from '../../action';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
const numColumns = 1;

var img1 = require('./images/Order-Groceries.jpg');
var img2 = require('./images/pepper.jpg');
var img3 = require('./images/lactaid.png');
var img4 = require('./images/wheat-in-a-sack.jpg');




class WishList extends Component {
    constructor(props) {
    super(props);
   
  }
  state={
    wishlist:[]
  }
  componentDidMount() {
    fetch('http://techfactories.com/test2/index.php?route=api/wishlist&api_token='+this.props.token)
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson.success && responseJson.data.products.length > 0){
          this.setState({
            wishlist:responseJson.data.products
          });
            // items=responseJson.data.products;
            // console.log(items);
            // dispatch({ type:'GET_WISHLIST',
            // payload:responseJson.data.products});
           
        }
       
    })
    .catch((error) => {
        console.error(error);
        //dispatch(itemsHaveError(true))
    });
  
  
  }
  static navigationOptions={
    drawerIcon:()=>(
    <Icon style={{fontSize:24,color:"#000" }} name="ios-heart" />
    )
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
        <View style={styles.buttonwrap}>
       
         <TouchableOpacity  onPress={() => this.props.addItemToCart({"product_id":item.product_id,"product_name":item.product_name,"thumb":item.thumb})} style={[styles.button,styles.addbutton]} ><Icon style={{color: 'green',marginRight:5}}  name="ios-cart" size={14} /><Text>Add to cart</Text></TouchableOpacity>
          </View>
      </View>
  
    );
  };
  
    render() {
   
        return (
            <View style={styles.container}>
           
           <Text style={{textAlign: 'center',fontSize: 20,fontWeight: '600',paddingVertical: 18   }}>WishList</Text>
           <FlatList
                data={this.state.wishlist}
                renderItem={this._renderItem}
                scrollEnabled={true}
                
                numColumns={numColumns}
                keyExtractor={(item, index) => index.toString()}
                />
      <View style={styles.bottom}>
     <TouchableOpacity onPress={() => this.props.clearWishList()}  style={{paddingVertical: 16,marginRight: 1,backgroundColor: '#1B4C99',flexDirection: 'row' ,alignItems: 'center',justifyContent: 'center'      }} >
       
            <Icon style={{color: '#fff',paddingHorizontal: 8}}  name="ios-heart" size={30} /><Text style={{color: '#fff', fontWeight: 'bold' }}>CLEAR WISHLIST</Text>
   
        
        </TouchableOpacity>
         </View>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
  console.log(state);
    return {
        cartItems: state.wishItems,
        token:state.authUser.token
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
       addItemToCart: (product) =>  dispatch(cartItems( product ,'ADD_TO_CART')),
       clearWishList: () => dispatch(clearwishList("123" ,'CLEAR_Wish_LIST')),
       getwishList:(token)=>dispatch(getwishListItems(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);


const styles = StyleSheet.create({
  container: {
    flex: 1
   
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
    flex:1,
    overflow:'hidden' 
  },
  count:{
    flex:1,
   color: 'red',
    fontWeight: 'normal',
    fontSize:18,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
button:{
borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:150,
       height:40,
       backgroundColor:'#fff',
       marginHorizontal: 5,
       padding:4,
       borderRadius:4,
       flexDirection:"row",
       flex:1
},
addbutton:{
  color: 'green',
  borderColor:'green'
},
buttonwrap:{
flex:2,
flexDirection: 'row',
alignItems:  'center' ,
justifyContent:  'center' 
},
  contentContainer: {
    paddingVertical: 0
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    
  }
})

  // <TouchableOpacity onPress={() => this.props.removeItem({"product_id":item.product_id})} style={{flex: 1}}><Icon  name="md-close" size={20} /></TouchableOpacity>