import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View , Text , FlatList, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'

import CustomButton from '../../components/CustomButton' 

import ShoppingCartIcon from './ShoppingCartIcon'

import HTMLView from 'react-native-htmlview';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';
/**
 * Just a centered logout button.
 */
const numColumns = 3;
let formdata = new FormData();

var img1 = require('./images/Order-Groceries.jpg');
var img2 = require('./images/pepper.jpg');
var img3 = require('./images/lactaid.png');
var img4 = require('./images/wheat-in-a-sack.jpg');
 //const { navigation } = this.props;

class Subcategories extends Component {
 
  constructor(props) {
    super(props);
    
  }
  
  state = {
    Data:[],
    item_id:""
    
  }
  componentWillMount(){
    const itemId = this.props.navigation.getParam('itemId', 'NO-ID');

     formdata.append("category_id", itemId);
     console.log(JSON.stringify(itemId));
      this._getCategoriesFromApiAsync();
     
  }
  static propTypes = {
    logout: PropTypes.func
  }
  _onPressButton = () =>{
      alert('i am pressed');
  }
  _getCategoriesFromApiAsync=() => {
    return fetch('http://techfactories.com/test2/index.php?route=api/category/categoryproduct&api_token=bb86ecd54e37af12464ffb1f4e',{
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ Data:responseJson.data})
        //console.log(this.state.Data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  _renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    const htmlContent = '<p>'+ item.name.toUpperCase() +'</p>';
    return (
        
      <View
        style={styles.item}
      >
      <TouchableOpacity>
      <ImageBackground source={img2} style={{
    width:100,
    height: 100,
    
    alignSelf: 'center',
    resizeMode: 'contain',
  }}>
        
        </ImageBackground>
        <HTMLView
        value={htmlContent}
        stylesheet={styles}
      />
       <Text>{item.category_id}</Text>
        </TouchableOpacity>
      </View>
  
    );
  };
  render () {
    console.log(this.state.Data);
     return (
     
         <FlatList
        data={this.state.Data.categories}
        style={styles.container}
        renderItem={this._renderItem}
        numColumns={numColumns}
        scrollEnabled={true}
         keyExtractor={(item, index) => index.toString()}
      />
      
    )
  }
}


const styles = StyleSheet.create({
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
    height: Dimensions.get('window').width+20 / numColumns, // approximate a square
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





export default withNavigation(Subcategories);
