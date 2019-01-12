/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,SafeAreaView,ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import Home from './src/Home';
const instructions = Platform.select({
  ios: 'IOS',
  android:
    'Android',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?
  }
 _simulateLogin = (username, password) => {
    this.setState({ isLoading: true })
    setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  _simulateSignup = (username, password, fullName) => {
    this.setState({ isLoading: true })
    setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  render() {
     if (this.state.isLoggedIn) {
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 3, height: 100, backgroundColor: 'powderblue'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'steelblue'}} />
      </View>
      )
    } else {
      return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} locations={[.1,0.50,1]} colors={['#275CAA', '#4677C4', '#275CAA']} style={styles.linearGradient}>
      
     <ScrollView>

<StatusBar
     backgroundColor="#1D4B98"
     barStyle="light-content"
     translucent={true}
   />

     <View style={styles.container}>

    <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 3, height: 100, backgroundColor: 'powderblue'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{flex: 1, height: 100, backgroundColor: 'steelblue'}} />
      </View>
   
     <View style={{flex: 1,height:400}}>
      <Home logout={() => this.setState({ isLoggedIn: true, isAppReady: false })} />
       <Animatable.Text animation="slideInDown" iterationCount={10} direction="alternate">Up and down you go</Animatable.Text>
        <Text style={styles.welcome}>Welcome Ecommerce Reactive App</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

     </View>  

  
  </View>

        </ScrollView>
           </LinearGradient>
    
    );
    }
    
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  
  },
  container: {
    flex: 1,
   
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  
});
