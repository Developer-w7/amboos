import React, { Component } from 'react'
import { StyleSheet, View , Text, StatusBar } from 'react-native'
import AuthScreen from './containers/AuthScreen'
import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from "react-native"
import { Provider } from 'react-redux'
import store from './store'
import Shop from './containers/Shop'
import ShoppingCartIcon from './containers/Shop/ShoppingCartIcon'
import ElectronicsScreen from './containers/Shop/ElectronicsScreen'
import BooksScreen from './containers/Shop/BooksScreen'
import CartScreen from './containers/Shop/CartScreen'
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
/**
 * The root component of the application.
 * In this component I am handling the entire application state, but in a real app you should
 * probably use a state management library like Redux or MobX to handle the state (if your app gets bigger).
 */
class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this._signOutAsync();
    this._bootstrapAsync();
  }
   static navigationOptions = {
     headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  };
  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('userToken', 'abc');
    } catch (error) {
      // Error saving data
    }
  }
// Fetch the token from storage then navigate to our appropriate place
_bootstrapAsync = async () => {
  const userToken = await AsyncStorage.getItem('userToken');

  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  this.props.navigation.navigate(userToken ? 'Dashboard' : 'Login');
};

_signOutAsync = async () => {
  await AsyncStorage.clear();
  
};
  /**
   * Two login function that waits 1000 ms and then authenticates the user succesfully.
   * In your real app they should be replaced with an API call to you backend.
   */
  _simulateLogin = (username, password) => {
    this._storeData();
    this._bootstrapAsync();
    //this.setState({ isLoading: true })
    //setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  _simulateSignup = (username, password, fullName) => {
    this._storeData();
    this._bootstrapAsync();
    //this.setState({ isLoading: true })
    //setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */
  render () {
    
   
      return (
        <Provider store={store}>
        <View style={styles.container}>
        
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
          </View>
        </Provider>
         
      )
    
  
}
}


class Feed extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Feed</Text>
      </View>
    );
  }
}

class Settings extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile</Text>
      </View>
    );
  }
}

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Shop,
    Profile,
    Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'Shop') {
          iconName = `ios-basket`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          
        } else if (routeName === 'Profile') {
          iconName = `md-people`;
        }
        else if (routeName === 'Settings') {
          iconName = `ios-settings`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#64A644',
      inactiveTintColor: 'gray',
    },
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
    ElectronicsScreen:{screen:ElectronicsScreen},
    BooksScreen:{screen:BooksScreen},
    CartScreen:{screen:CartScreen},
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10,color:"#fff" }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
         headerRight: (
                <ShoppingCartIcon />
            ),
            headerStyle: {
              backgroundColor: '#123B7D',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'normal',
            }
      };
    }
  }
);



const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  },
  Home: {
    screen: Shop
  }
 
});
const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: AppDrawerNavigator,
    navigationOptions: {
      title: 'Home',
      header: null //this will hide the header
    } },
  Dashboard: { screen: AppDrawerNavigator }
});
const AppContainer = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  }
})