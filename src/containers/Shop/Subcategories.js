import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,ActivityIndicator, View , Text , FlatList, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'

import CustomButton from '../../components/CustomButton' 

import ShoppingCartIcon from './ShoppingCartIcon'
import LinearGradient from 'react-native-linear-gradient';
import HTMLView from 'react-native-htmlview';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { withNavigation } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
/**
 * Just a centered logout button.
 */
const numColumns = 3;
const resizeMode = 'center';
const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';
let formdata = new FormData();
let token="be0bcbc31f28641dedb77be3e1";
let ren_data=[];
var img1 = require('./images/Order-Groceries.jpg');
var img2 = require('./images/pepper.jpg');
var img3 = require('./images/lactaid.png');
var img4 = require('./images/wheat-in-a-sack.jpg');
class Subcategories extends Component {
 
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

  componentWillMount(){
    const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
    const get_token = this.props.navigation.getParam('token');
     token=get_token;
     formdata.append("category_id", itemId);
     if(ren_data != null){
      ren_data=[];
     }
      
     
  }
componentDidMount() {
this._getCategoriesFromApiAsync();
}
   onChangeText(text, index, data) {
   if(data[index].cat_id){
    this.props.navigation.push('Subcategories', {
              itemId: data[index].cat_id,
              token:token
            });
   }
 
   }

  _getCategoriesFromApiAsync=() => {
    return fetch('http://techfactories.com/test2/index.php?route=api/category/categoryproduct&api_token='+token,{
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
      })
      .then((response) => response.json())
      .then((responseJson) => {



        this.setState({ Data:responseJson.data})
        if( responseJson.data.categories){

           responseJson.data.categories.forEach(function (value) {
          var jsonObject = {value:value.name, cat_id:value.category_id}; 
        ren_data.push(jsonObject);
        });
        }
       
   
  

            //console.log(ren_data);
       this.setState({ main:ren_data,loader:false});  
    
        //console.log(responseJson.data.categories);
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
      <TouchableOpacity onPress={() => {
            
            this.props.navigation.navigate('Product', {
              itemId: item.product_id,
              token:token
            });
          }}>
<ImageBackground source={{uri:item.thumb}} style={{
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
       <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
      </View>
  
    );
  };
  render () {
    
    if(this.state.loader == false){
     return (
      <ScrollView>
     <View style={styles.container}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} locations={[.1,0.50,1]} colors={['#123B7D', '#3077EB', '#649CF6']} style={styles.dropdown}>

      <Dropdown value="Select" 
      itemCount = {10} 
      fontSize={13}
      dropdownOffset={{top:22,left:0}}
      dropdownMargins={{min: 10, max: 20}}

       containerStyle={{marginTop:10,marginBottom:10,marginLeft: 3,marginRight: 3, borderWidth:1, borderColor:'#649CF6', borderRadius:50, paddingLeft:40, paddingRight: 10}}
        inputContainerStyle={{ borderBottomColor: 'transparent' }}
       onChangeText={this.onChangeText} 
label='Categories'
       baseColor='#fff' 
       data={this.state.main}/>
       </LinearGradient>
         <FlatList
        data={this.state.Data.products}
        style={styles.container}
        renderItem={this._renderItem}
        numColumns={numColumns}
        scrollEnabled={false}
         keyExtractor={(item, index) => index.toString()}
      />
      </View>
      </ScrollView>
    )
  }
else{
       return (
     <View style={styles.loader}>
     <ActivityIndicator size="large" color="#00ff00" />
    
          
        
      </View>
      
    )
    }

  }
}

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
   backgroundColor: '#eee',
   
  },
  dropdown: {
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
    margin: 3,
    padding:3,
    height: (Dimensions.get('window').width / numColumns)+50, // approximate a square
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
    color: '#64A644',
    letterSpacing: 1
  }
})





export default withNavigation(Subcategories);
