import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View , Text , StatusBar, Button} from 'react-native'

import CustomButton from '../../components/CustomButton' 
import ElectronicsScreen from '../Shop/ElectronicsScreen'
import BooksScreen from '../Shop/BooksScreen'
import ShoppingCartIcon from '../Shop/ShoppingCartIcon'
import CartScreen from '../Shop/CartScreen'
import Home from '../../Home'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
/**
 * Just a centered logout button.
 */
class HomeScreen extends Component {
  static propTypes = {
    logout: PropTypes.func
  }

  render () {
     const { navigation } = this.props;
     console.log(navigation);

    return (
      <View style={styles.container}>
      <StatusBar
     backgroundColor="#1D4B98"
     barStyle="light-content"
     translucent={true}
   />
    <View style={styles.container}>
                <Button title="Electronics" onPress={() => this.props.navigation.navigate('Electronics')} />
                <Button title="Books" onPress={() => this.props.navigation.navigate('Books')} />
            </View>
        <CustomButton
          text={'Logout'}
          onPress={() => this.props.navigation.navigate('Dashboard')}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})





export default HomeScreen;
