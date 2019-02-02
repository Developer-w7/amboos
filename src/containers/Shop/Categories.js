import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View , Text , FlatList, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
import { AsyncStorage } from "react-native"
import { withNavigation } from 'react-navigation';


import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
/**
 * Just a centered logout button.
 */
const numColumns = 3;

//const { navigation } = this.props;
let formdata = new FormData();
formdata.append("category_id", '1')
var img1 = require('./images/Order-Groceries.jpg');
var img2 = require('./images/pepper.jpg');
var img3 = require('./images/lactaid.png');
var img4 = require('./images/wheat-in-a-sack.jpg');

class Categories extends Component {
 
  constructor(props) {
    super(props);
    
    
  }
  
  state = {
    Data:[],
    token:'be0bcbc31f28641dedb77be3e1'
    
  }
  static propTypes = {
    logout: PropTypes.func
  }

  componentDidMount() {
    this._retrieveData().then(() =>{
          this._getCategoriesFromApiAsync();
       } );
       
    }

     _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('session_token');
    if (value !== null) {
      this.setState({ token:value});
      // We have data!!
      //console.log(value);
    }
   } catch (error) {
      console.log(error);
   }
}
  _onPressButton = () =>{
      alert('i am pressed');
  }
 
  _getCategoriesFromApiAsync=() => {
    return fetch('http://techfactories.com/test2/index.php?route=api/category&api_token='+this.state.token)
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
    return (
        
      <View
        style={styles.item}
      >
      <TouchableOpacity onPress={() => {
            
            this.props.navigation.navigate('Subcategories', {
              itemId: item.category_id,
              token:this.state.token
             
            });
          }}>
      <ImageBackground source={{uri:(item.image)?item.image:'http://www.iglax.org/wp-content/uploads/2014/12/placeholder-Copy-1.png'}} style={{
    width:100,
    height: 100,
    
    alignSelf: 'center',
    resizeMode: 'contain',
  }}>
        
        </ImageBackground>
        <Text style={styles.itemText}>{item.name.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
  
    );
  };
  render () {
   
    return (

        <FlatList
        data={this.state.Data}
        style={styles.container}
        renderItem={this._renderItem}
        numColumns={numColumns}
        scrollEnabled={false}
         keyExtractor={(item, index) => index.toString()}
      />
    
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





export default withNavigation(Categories);
