import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,KeyboardAvoidingView, View , Text , FlatList, ActivityIndicator, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { AsyncStorage } from "react-native"
import thunk from 'redux-thunk';
import HTMLView from 'react-native-htmlview';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import { FetchData} from '../../action';
import t from 'tcomb-form-native';

const Form = t.form.Form;
let formdata = new FormData();
// see the "Rendering options" section in this guide
var options = {
  stylesheet: styles,
  auto: 'placeholders'
};
var Person = t.struct({
  First_Name: t.String,
  Last_Name: t.String,
  Email: t.maybe(t.String),
  Telephone: t.Number
});
var Password = t.struct({
   NewPassword: t.Number
});
class Settings extends Component {

constructor(props) {
    super(props);
    
  }
  
 static navigationOptions={
drawerIcon:()=>(
  <Icon style={{fontSize:24,color:"#000" }} name="ios-settings" />
  )
  }
 
  state = {
    Data:[],
    token:'be0bcbc31f28641dedb77be3e1',
    value:{
      First_Name: "demo",
      Last_Name: "man",
      Email: "demo@gmail.com",
      Telephone: "7012749699"
    },
    status:[]
  }
  componentDidMount() {
    this._retrieveData().then(() =>{
      this._getProfile();
   } ); 
       
    }

    _getProfile=() => {
      return fetch('http://techfactories.com/test2/index.php?route=api/account&api_token='+this.state.token)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ Data:responseJson.data})
          let profile={
            First_Name:responseJson.data.firstname,
      Last_Name: responseJson.data.lastname,
      Email: responseJson.data.email,
      Telephone:responseJson.data.telephone
          }
          this.setState({value:profile});
          console.log(this.state.Data);
        })
        .catch((error) => {
          console.error(error);
        });
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

    _updateProfile=(value) => {
   
      formdata.append("Firstname:", value.First_Name);
      formdata.append("lastname:", value.Last_Name);
      formdata.append("email:", value.Email);
      formdata.append("telephone:", value.Telephone);
console.log(formdata);
      return fetch('http://techfactories.com/test2/index.php?route=api/account/edit&api_token='+this.state.token,{
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata
        })
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.error(error);
        });
    }

  onPress= () =>{
  
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null


      if(this.state.token){
        this._updateProfile(value);
      }
        
    
      //console.log(value); // value here is an instance of Person
    }
  }
  render() {  
    


    return (
	<ScrollView>
        <KeyboardAvoidingView>
	<Text style={styles.heading}>EDIT PROFILE</Text>
     <View style={styles.container}>
 
        <Form ref="form" type={Person} value={this.state.value} options={options} />
      
      </View>
<TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text style={styles.buttonText}>UPDATE</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>CHANGES PASSWORD</Text>
     <View style={styles.container}>
 
        <Form ref="password" type={Password} value={this.state.value} options={options} />
      
      </View>
<TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text style={styles.buttonText}>UPDATE</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
     </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {

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
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Settings));




const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
 
   
  },
  linearGradient: {
    flex: 1,
    borderRadius: 8 ,
   margin: 5
  },
  heading:{
  fontWeight:'bold',
  fontSize: 16,
  color: '#666',
  textAlign:  'center',
  paddingVertical:15
  },
  profile_block:{
 
    paddingHorizontal:20,
    flex: 1,
    margin: 1,
    height:180,
   justifyContent: 'center',
   

  }, 
  button: {
    backgroundColor: '#64A644',
    margin: 20,
    paddingVertical: 10,
borderRadius: 3
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center' 
  },
  item: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    flex: 1,
    margin: 1,
    height:180,
   justifyContent: 'center',
   borderRadius: 8 ,
   margin: 5
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontWeight: 'normal',
    paddingVertical: 8,
    fontWeight: 'bold'
  }
})








