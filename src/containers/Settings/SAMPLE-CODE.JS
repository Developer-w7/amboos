import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,TouchableHighlight,KeyboardAvoidingView, View , Text , FlatList, ActivityIndicator, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { AsyncStorage } from "react-native"
import thunk from 'redux-thunk';
import HTMLView from 'react-native-htmlview';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import { FetchData} from '../../action';
import RazorpayCheckout from 'react-native-razorpay';
import t from 'tcomb-form-native';

const Form = t.form.Form;
let ob={
  'IT': 'Italy',
  'US': 'United States'
};
let country_list= {};
let state_list= {};
// see the "Rendering options" section in this guide

let Country;
let State;
class Settings extends Component {

constructor(props) {
    super(props);
    this._getCountry.bind(this);
    this._getState.bind(this);
}
state = {
  Data:[],
  type:null,
  token:'be0bcbc31f28641dedb77be3e1',
  values:{},
  status:[],
  final:null,
  key:""
} 

componentWillMount(){
  this._getCountry();
 
  
}
componentDidMount(){
 
}

_getCountry=() => {
  return fetch('http://techfactories.com/test2/index.php?route=api/account/getCountryList')
    .then((response) => response.json())
    .then((responseJson) => {
      // let obs={};
      // let plus5 = responseJson.map((val, i, arr) => {
      //   return val;
      // });
      console.log(responseJson);
      
      let plus5 = responseJson.countries.map((val, i, arr) => {
       
         country_list={...country_list,...{[val.country_id]:val.name}};
        return {
         [val.country_id]:val.name
        };
    
        //  obs={...obs,...person};
     })
     Country = t.enums(country_list,'Country');
     this.setState({type: this.getType(this.state.values)});
 
    
 
   
    })
    .catch((error) => {
      console.error(error);
    });
}

_getState=(country_id,value) => {
  return fetch('http://techfactories.com/test2/index.php?route=api/account/country&country_id='+country_id)
    .then((response) => response.json())
    .then((responseJson) => {
    
      console.log(responseJson.zone);
      state_list={};
      let state_val = responseJson.zone.map((val, i, arr) => {
       
        state_list={...state_list,...{[val.zone_id]:val.name}};
        
    
        
     })
     State = t.enums(state_list,'State');
     let type = (value.country !== this.state.values.country )?this.getType(value):this.state.type;
     this.setState({ values:value, type:type });
 
    return true;
 
   
    })
    .catch((error) => {
      console.error(error);
    });
}


    onPress=()=> {
      
    }

    onChange(value) {
      console.log(value);
      if (value.country){
       this._getState(value.country,value);
       
      
      }
     
      // recalculate the type only if strictly necessary
      
    
    }

    getType(value) {
if (value.country) {

        return t.struct({
          country: Country,
          state: State

        });
        } else {
        return t.struct({
          country: Country
        });
      }
    }

  render() {  
    


    return (
	<ScrollView>
        <KeyboardAvoidingView>


        <Text style={styles.heading}>Country State Update</Text>
     <View  style={styles.container}>
     <View style={styles.container}>
      <TouchableHighlight onPress={() => {
        var options = {
          description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: 'rzp_test_1DP5mmOlF5G5ag',
          amount: '5000',
          external: {
            wallets: ['paytm']
          },
          name: 'foo',
          prefill: {
            email: 'akshay@razorpay.com',
            contact: '8955806560',
            name: 'Akshay Bhalotia'
          },
          theme: {color: '#F37254'}
        }
        RazorpayCheckout.open(options).then((data) => {
          // handle success
          alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
          // handle failure
          alert(`Error: ${error.code} | ${error.description}`);
        });
        RazorpayCheckout.onExternalWalletSelection(data => {
          alert(`External Wallet Selected: ${data.external_wallet} `);
        });
      }}>
      <Text style = {styles.text}>PAY</Text>
      </TouchableHighlight>
      </View>
 {this.state.type && Country && <Form  ref="form" type={this.state.type} value={this.state.values} onChange={this.onChange.bind(this)}/>}
    
      
      </View>
<TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text style={styles.buttonText}>UPDATE{this.state.key}</Text>
        </TouchableOpacity>

        </KeyboardAvoidingView>
     </ScrollView>
    );
  }
}


export default Settings;




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








