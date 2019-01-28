import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View , Text , FlatList, ActivityIndicator, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
import HTMLView from 'react-native-htmlview';
import { withNavigation } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import { cartItems,itemsFetchData } from '../../action';
import store from '../../store'
/**
 * Just a centered logout button.
 */
const numColumns = 3;
let formdata = new FormData();
let token="be0bcbc31f28641dedb77be3e1";
let ren_data=[];
var img1 = require('./images/Order-Groceries.jpg');
var img2 = require('./images/pepper.jpg');
var img3 = require('./images/lactaid.png');
var img4 = require('./images/wheat-in-a-sack.jpg');



class Product extends Component {
 
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    
  }


  state = {
    Data:[],
    item_id:"",
    main:[],
    loader:true,
    token:''
  }

 componentDidMount() {
        //this.props.fetchData();
    }

  componentWillMount(){

     const get_token = this.props.navigation.getParam('token');
     token=get_token;
    const itemId = this.props.navigation.getParam('itemId', 'NO-ID');

     formdata.append("product_id", itemId);
     
      this._getCategoriesFromApiAsync();
     
  }
  
   onChangeText(text, index, data) {
   alert('added to cart');
 
   }

  _getCategoriesFromApiAsync=() => {
    return fetch('http://techfactories.com/test2/index.php?route=api/product&api_token='+token,{
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
      })
      .then((response) => response.json())
      .then((responseJson) => {



        this.setState({ Data:responseJson.data,loader:false})
     
      })
      .catch((error) => {
        console.error(error);
      });
  }

 _renderimages = (images) =>{

return   <ImageBackground source={{uri:images}} style={{
    width:250,
    height: 250,
    
    alignSelf: 'center',
    resizeMode: 'contain',
  }}>
        
        </ImageBackground>
 }
  render () {
    

    console.log(this.state.Data);

    if(this.state.loader == false){
    	 return (
  
        <ScrollView>
     <View style={styles.container}>
       {this._renderimages(this.state.Data.thumb)} 
           <Text style={styles.price}>{this.state.Data.name}</Text>
        
         <Button
  onPress={() => this.props.addItemToCart({"product_id":this.state.Data.product_id,"product_name":this.state.Data.name,"thumb":this.state.Data.thumb})}
  title="Add to cart"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
          <Text style={styles.price}>{this.state.Data.price}</Text>
          <HTMLView
        value={this.state.Data.description}
        stylesheet={htmlstyles}
      />
       
          
        
      </View>
       </ScrollView>
  
    )
    }else{
    	 return (
     <View style={styles.loader}>
     <ActivityIndicator size="large" color="#00ff00" />
    
          
        
      </View>
      
    )
    }


     
  }
}

Product.propTypes = {
    addItemToCart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
         token: state.items,
         hasError: state.itemsHaveError,
         isLoading: state.itemsAreLoading
    };
};

const mapDispatchToProps = (dispatch) => {

  return {

      addItemToCart: (product) =>  dispatch(cartItems( product ,'ADD_TO_CART'))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);



const htmlstyles = StyleSheet.create({
  p:{
color: '#000',
    fontWeight: 'normal',
    fontSize:15,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


const styles = StyleSheet.create({
  loader:{
flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  p:{
color: '#000',
    fontWeight: 'normal',
    fontSize:10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    height: (Dimensions.get('window').width / numColumns)+30, // approximate a square
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
  price:{
    textAlign: 'center' ,
    paddingVertical: 4,
    color: 'red'
  }
})






