import React, { Component } from 'react'
import { StyleSheet, View ,Image, Text, StatusBar ,SafeAreaView, Dimensions, ScrollView } from 'react-native'
import AuthScreen from './containers/AuthScreen'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { AsyncStorage } from "react-native"
import { Provider } from 'react-redux'
import configureStore from './store';
import Shop from './containers/Shop'
import ShoppingCartIcon from './containers/Shop/ShoppingCartIcon'
import Logo from './containers/Shop/Logo'
import ElectronicsScreen from './containers/Shop/ElectronicsScreen'
import BooksScreen from './containers/Shop/BooksScreen'
import CartScreen from './containers/Shop/CartScreen'
import Subcategories from './containers/Shop/Subcategories'
import Product from './containers/Shop/Product'

import Categories from './containers/Shop/Categories'
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  DrawerItems
} from 'react-navigation';
/**
 * The root component of the application.
 * In this component I am handling the entire application state, but in a real app you should
 * probably use a state management library like Redux or MobX to handle the state (if your app gets bigger).
 */

 
 const store = configureStore();
class App extends Component {
  render() {

    return(
    <Provider store={store}>
    <AppContainer />
    </Provider>
    )
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
       
        <View style={styles.container}>
        
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
          </View>
      
         
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


const ShopStack = createStackNavigator(
  {
    Shop: {
      screen: Shop,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Shop',
          headerLeft: (
            <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
          )
        };
      }
    },
    Categories: {
      screen: Categories
    },
    Subcategories: {
      screen: Subcategories
    },
    Product:{
      screen: Product
    },
    CartScreen:{
      screen: CartScreen
    }
  },
  {
    initialRouteName: 'Shop',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);


const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Profile',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Settings',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});




const DashboardTabNavigator = createBottomTabNavigator(
  {
    ShopStack,
    ProfileStack,
    SettingsStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'ShopStack') {
          iconName = `ios-basket`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          
        } else if (routeName === 'ProfileStack') {
          iconName = `md-people`;
        }
        else if (routeName === 'SettingsStack') {
          iconName = `ios-settings`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#64A644',
      inactiveTintColor: 'gray',
    }
   
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,

  
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
        headerTitle: (
      <Logo/>
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

const customDrawerComponent =(props) =>(
<SafeAreaView>

<ScrollView>
<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} locations={[.1,0.50,1]} colors={['#275CAA', '#4677C4', '#275CAA']} style={styles.linearGradient}>
<View style={{flex:1,height:150,alignItems: 'center',justifyContent: 'center'}}>
 <Image style={styles.logo} source={require('./images/logo.png')}/>
</View>
  </LinearGradient>
<DrawerItems {...props} />


</ScrollView>
</SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  },
  Home: {
    screen: Shop
  }
 
},{
  contentComponent:customDrawerComponent
}

);
const AppSwitchNavigator = createSwitchNavigator({
  Login: { screen: AppDrawerNavigator,
    navigationOptions: {
      title: 'Home',
      header: null //this will hide the header
    } },
  Dashboard: { screen: AppDrawerNavigator },
  
});
const AppContainer = createAppContainer(AppSwitchNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
   logo:{
    width: 130,

    resizeMode:'contain'
    }, 
    linearGradient: {
    flex: 1,
    
  }
})