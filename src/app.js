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
import CartScreen from './containers/Shop/CartScreen'
import Wishlist from './containers/Shop/WishList'
import Subcategories from './containers/Shop/Subcategories'
import Product from './containers/Shop/Product'
import Profile from './containers/profile/Profile'
import Settings from './containers/Settings/'
import deviceStorage from './services/deviceStorage';
import Categories from './containers/Shop/Categories'
import CheckOut from './containers/Shop/CheckOut'
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
      
        this.state = {
            isLoggedIn: false, // Is the user authenticated?
            isLoading: false, // Is the user loggingIn/signinUp?
            isAppReady: false ,// Has the app completed the login animation?
           
        }

        this.loadToken = deviceStorage.loadToken.bind(this);
        this.loadToken();

        this._signOutAsync();
        // this._bootstrapAsync();
    }

    static navigationOptions = {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    };


    //   _storeData = async () => {
    //     try {

    //       await AsyncStorage.setItem('userToken', 'abc');
        
    //     } catch (error) {
    //       // Error saving data
    //     }
    //   }
    // Fetch the token from storage then navigate to our appropriate place
    // _bootstrapAsync = async () => {

    //   const userToken = await AsyncStorage.getItem('session_token');

    // this.setState({apiToken:userToken});
    //   // This will switch to the App screen or Auth screen and this loading
    //   // screen will be unmounted and thrown away.
    //   //this.props.navigation.navigate(userToken ? 'Dashboard' : 'Login');
    // };



    _signOutAsync = async () => {
        await AsyncStorage.clear();

    };
    _storeUserData = async (data) => {
        try {
            await AsyncStorage.setItem('customer_id',data);
        } catch (error) {
            // Error saving data
        }
    }
  
    /**
     * Two login function that waits 1000 ms and then authenticates the user succesfully.
     * In your real app they should be replaced with an API call to you backend.
     */
    _simulateLogin = (username, password) => {

        let formdata = new FormData();

        if(username =='' || password ==''){

            alert('Please fill all fields!!!...');

        }else{
    
            formdata.append("email", username);
            formdata.append("password",password);

            fetch('http://techfactories.com/test2/index.php?route=api/customerlogin&api_token='+this.state.token, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
            })
            .then((response) => response.json())
            .then((responseJson) => {

                if(responseJson.success){

                    this.setState({isLoggedIn:true,isLoading:false});
                    this._storeUserData(responseJson.customer_id);
                    // AsyncStorage.setItem('customer_id',responseJson.customer_id);
                    // AsyncStorage:multiSet([['customer_id',responseJson.customer_id],['email',responseJson.email]]);
                    // deviceStorage.saveKey("logged_user",JSON.stringify({customer_id:responseJson.customer_id,
                    //     email:responseJson.email,
                    //     firstname:responseJson.firstname,
                    //     lastname:responseJson.lastname,
                    //     telephone:responseJson.telephone}));
                        // const loggedperson = AsyncStorage.getItem('customer_id');
                        // alert(loggedperson);
                        // console.log(loggedperson);
                        // alert(JSON.parse(loggedperson));
                    
                    this.props.navigation.navigate('Dashboard');

                }else{

                    alert('some error occured please try again later...');
                    this.props.navigation.navigate('Login');
                }

            })
            .catch((error) => {

                console.log(error);
                this.props.navigation.navigate('Login');
            });
        }
    }

    _simulateSignup = (firstname,lastname,email, password, telephone) => {

        let formdata = new FormData();
        formdata.append("firstname", firstname);
        formdata.append("lastname", lastname);
        formdata.append("email", email);
        formdata.append("password",password);
        formdata.append("telephone",telephone);

        fetch('http://techfactories.com/test2/index.php?route=api/register&api_token='+this.state.token, {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formdata
        })
        .then((response) => response.json())
        .then((responseJson) => {

            if(responseJson.success){
                
                alert('Registration Completed Successfully.Please login Now');
                this.props.navigation.navigate('Login');
            }else{
                alert('some problem occured please try againe!..');
                this.props.navigation.navigate('Login');
            }

        })  
        .catch((error) => {
            console.log(error);
            this.props.navigation.navigate('Login');
        });
    }
   

    // getuser=async retrieveItem(key) {
    //     try {
    //       const retrievedItem =  await AsyncStorage.getItem(key);
    //       const item = JSON.parse(retrievedItem);
    //       return item;
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //     return
    //   }
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



const ShopStack = createStackNavigator({
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
    },
    CheckOut:{
        screen:CheckOut
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
            header: null,
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
        header: null,
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

// class Wishlist extends Component {
//     static navigationOptions={
//         drawerIcon:()=>(
//         <Icon style={{fontSize:24,color:"#000" }} name="ios-heart" />
//         )
//     }
//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <Text>Wishlist</Text>
//             </View>
//         );
//     }
// }

class Logout extends Component {

    static navigationOptions={
        drawerIcon:()=>(
        <Icon style={{fontSize:24,color:"#000" }} name="ios-log-out" />
        )
    }
    render() {
        return (
            <AppContainer></AppContainer>
        );
    }
}


const AppDrawerNavigator = createDrawerNavigator({
    Dashboard: {
        screen: DashboardStackNavigator
    },
    Shop: {
        screen: Shop
    },
    Profile: {
        screen: Profile
    },
    Cart: {
        screen: CartScreen
    },
    Wishlist: {
        screen: Wishlist
    },
    Settings: {
        screen: Settings
    },
    Logout: {
        screen: Logout
    }

},{
    contentComponent:customDrawerComponent
}

);
const AppSwitchNavigator = createSwitchNavigator({
    Login: { screen:LoginPage,
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