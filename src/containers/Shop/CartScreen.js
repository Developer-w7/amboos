import React, { Component } from "react";

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
import { StyleSheet, View , Text , FlatList, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'

import { withNavigation } from 'react-navigation';

import { cartItems,itemsFetchData,dropItems,removeItems,getCartList} from '../../action';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
const numColumns = 1;

var img1 = require('./images/Order-Groceries.jpg');
var img2 = require('./images/pepper.jpg');
var img3 = require('./images/lactaid.png');
var img4 = require('./images/wheat-in-a-sack.jpg');




class CartScreen extends Component {
    constructor(props) {
    super(props);
this.props.getCart(this.props.token);
    
  }
  state={
    cartlist:[]
  }

  componentDidMount() {
  
    // fetch('http://techfactories.com/test2/index.php?route=api/cart/products&api_token='+this.props.token)
    // .then((response) => response.json())
    // .then((responseJson) => {
    //     if(responseJson.products.length > 0){
    //       this.setState({
    //         cartlist:responseJson.products
    //       });
    //       // alert(JSON.stringify(responseJson.products));
    //         // items=responseJson.data.products;
    //         // console.log(items);
    //         // dispatch({ type:'GET_WISHLIST',
    //         // payload:responseJson.data.products});
           
    //     }
       
    // })
    // .catch((error) => {
    //     console.error(error);
    //     //dispatch(itemsHaveError(true))
    // });
  
  
  }

  static navigationOptions={
drawerIcon:()=>(
  <Icon style={{fontSize:24,color:"#000" }} name="ios-cart" />
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

processCheckout(){
  // if(this.props.cartItems.length > 0){
    this.props.navigation.navigate('CheckOut')
//     let  products=this._processcart(this.props.cartItems)
//       fetch('http://techfactories.com/test2/index.php?route=api/cart/productAdd&api_token='+this.props.token, {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(products),
// }).then((response) => response.json())
//     .then((responseJson) => {
//       alert(JSON.stringify(responseJson));
//       console.log(responseJson)
//     })
//     .catch((error) => {
//       console.error(error);
//     });
  // }else{
  //   alert('Your Cart is empty!....Please add products to cart')
  // }
 

  // alert(JSON.stringify(this.props));
  // let product=[{"product_id":11,"quantity":1}];
  // let formdata = new FormData();
  // // alert(product);
  // formdata.append("product",product);
  // formdata.append("quantuty",1);
  //  fetch('http://techfactories.com/test2/index.php?route=api/cart/productAdd&api_token='+this.props.token, {
  //             method: 'post',
  //             headers: {
  //                 'Content-Type': 'multipart/form-data',
  //             },
  //             body: JSON.stringify(formdata)
  //         })
  //         .then((response) => response.json())
  //         .then((responseJson) => {
          
  //             console.log(responseJson);
      

  //         })
  //         .catch((error) => {
  //             console.error(error);
  //             //dispatch(itemsHaveError(true))
  //         });
  // this.props.navigation.navigate('CheckOut')
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
     
       <View style={styles.buttonwrap}>
         <TouchableOpacity  onPress={() => this.props.addItemToCart({"product_id":item.product_id,"product_name":item.product_name,"thumb":item.thumb,"token":this.props.token})} style={[styles.button,styles.addbutton]} ><Icon style={{color: 'green'}}  name="md-add" size={14} /></TouchableOpacity>
         <TouchableOpacity  onPress={() => this.props.dropItemFromCart({"product_id":item.product_id,"token":this.props.token,"cart_id":item.cart_id,"count":item.count})} style={[styles.button,styles.dropbutton]}><Icon style={{color: 'red'}} name="md-remove" size={14} /></TouchableOpacity>
         <TouchableOpacity  onPress={() => this.props.removeItem({"product_id":item.product_id,"token":this.props.token,"cart_id":item.cart_id})} style={[styles.button, styles.removebutton]}><Icon  style={{color: '#f7041d'}} name="md-close" size={14} /></TouchableOpacity>
       
      
         </View>
      </View>
  
    );
  };
    render() {
     
        return (
            <View style={styles.container}>
           <Text style={{textAlign: 'center',fontSize: 20,fontWeight: '600',paddingVertical: 18   }}>Cart View</Text>
                 <FlatList
        data={this._processcart(this.props.cartItems)}
       
        renderItem={this._renderItem}
        numColumns={numColumns}
        scrollEnabled={true}
         keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.bottom}>
     <TouchableOpacity  style={{paddingVertical: 16,marginRight: 1,backgroundColor: '#1B4C99',flexDirection: 'row' ,alignItems: 'center',justifyContent: 'center'      }} onPress={() =>this.processCheckout() }>
       
            <Icon style={{color: '#fff',paddingHorizontal: 8}}  name="ios-cart" size={30} /><Text style={{color: '#fff', fontWeight: 'bold' }}>PROCEED TO CHECKOUT</Text>
   
        
        </TouchableOpacity>
         </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
  console.log(state);
    return {
        cartItems: state.cartItems,
        token:state.authUser.token
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
       addItemToCart: (product) => dispatch(cartItems(product , 'ADD_TO_CART')),
       dropItemFromCart: (product_id) => dispatch(dropItems(product_id , 'DROP_ITEM_FROM_CART')),
       removeItem: (product_id) => dispatch(removeItems(product_id , 'REMOVE_FROM_CART')),
       getCart: (token) => dispatch(getCartList(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);


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
    flex:4,
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
       width:24,
       height:24,
       backgroundColor:'#fff',
       borderRadius:100,
       marginHorizontal: 5,
       padding:4
},
addbutton:{
  color: 'green',
  borderColor:'green'
},
buttonwrap:{
flex:3,
flexDirection: 'row',
alignItems:  'center' ,
justifyContent:  'center' 
},
dropbutton:{
borderColor:'red'
},
removebutton:{
backgroundColor: '#8c041a',
borderColor:'#8c041a'
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