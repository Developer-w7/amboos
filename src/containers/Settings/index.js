import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View , Text , FlatList, ActivityIndicator, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
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
const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

var Gender = t.enums({
  M: 'Male',
  F: 'Female'
});
// see the "Rendering options" section in this guide
var options = {
	stylesheet: styles,
  fields: {
    birthDate: {
      mode: 'date' // display the Date field as a DatePickerAndroid
    },
    gender: {
      nullOption: {value: '', text: 'Choose your gender'}
    }
  }
};
var Person = t.struct({
  First_Name: t.String,
  Last_Name: t.String,
  Email: t.maybe(t.String),
  Telephone: t.Number,
  // birthDate: t.Date,
  // gender: Gender // enum
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
    token:'be0bcbc31f28641dedb77be3e1'
    
  }
  
  render() {


    return (
	<ScrollView>
	<Text style={styles.heading}>EDIT PROFILE</Text>
     <View style={styles.container}>
        <Form type={Person} options={options} />
      </View>
<TouchableOpacity style={styles.button} onPress={() => {alert('working')}}>
        <Text style={styles.buttonText}>UPDATE</Text>
        </TouchableOpacity>
     </ScrollView>
    );
  }
}

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








export default Settings;