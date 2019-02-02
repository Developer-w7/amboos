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
let formdata = new FormData();
const numColumns = 1;
formdata.append("email", 'ansarnajeemertty@gmail.com');

formdata.append("password", 'ansar@najeem');

class Transactions extends Component {

constructor(props) {
    super(props);
    
    
  }
  
  state = {
    Data:[],
    token:'be0bcbc31f28641dedb77be3e1'
    
  }
  componentDidMount() {
    this._retrieveData().then(() =>{
          this._login();
       } );
       
    }
  _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('session_token');
    if (value !== null) {
      this.setState({ token:value});
      
    }
   } catch (error) {
      console.log(error);
   }
}

  _login=() => {
   
  }


_renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} locations={[.4,1]} colors={['#275CAA', '#05A14F']} style={styles.linearGradient}>    
      <View
        style={styles.item}
      >
      

        <Text style={styles.itemText}>Order ID: {item.order_id}</Text>
        <Text style={styles.itemText}>Order Status: {item.status}</Text>
        <Text style={styles.itemText}>Order Date: {item.date_added}</Text>
        <Text style={styles.itemText}>Amount Paid: {item.total}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {alert('working')}}>
        <Text style={styles.buttonText}>VIEW DETAILS</Text>
        </TouchableOpacity>



      </View>
  </LinearGradient>
    );
  };



  render() {
console.log(this.props.orderData);
if(this.props.orderData){
  return (
      <View style={styles.container}>
      <Text style={styles.heading}>ORDER HISTORY</Text>
       <FlatList
        data={this.props.orderData}
        style={styles.container}
        renderItem={this._renderItem}
        numColumns={numColumns}
        scrollEnabled={false}
         keyExtractor={(item, index) => index.toString()}
      />
      
  </View>
    )
}
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No Orders Found!</Text>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
 
    return {
        orderDetails: state.order_Data
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
   
  },
  linearGradient: {
    flex: 1,
    borderRadius: 8 ,
   margin: 5
  },
  heading:{
  fontWeight:'bold',
  fontSize: 18,
  color: '#666',
  textAlign:  'center',
  paddingVertical:20 
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
    paddingHorizontal: 30,
    flex: 1,
    margin: 1,
    height:180,
   justifyContent: 'center',
   
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontWeight: 'normal',
    paddingVertical: 2
  }
})

export default connect(mapStateToProps, null)(Transactions);