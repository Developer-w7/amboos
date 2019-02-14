import React, { Component } from 'react'
import { TouchableHighlight,StyleSheet, View , Text , FlatList, StatusBar, Button, SafeAreaView, Dimensions, Image, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
import { withNavigation } from 'react-navigation';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import RazorpayCheckout from 'react-native-razorpay';
export default class CartItems extends Component {
    constructor(props){
        super(props);
      
    }
    _renderItem = ({ item, index }) => {
        if (item.empty === true) {
          return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            
          <View
            style={styles.item}
          >
         
         <Image
              style={{width: 50, height: 50}}
              source={{uri: item.thumb}}
            />
            <Text style={styles.itemText}>{item.product_name.toUpperCase()}</Text>
           <Text style={styles.count}>{item.quantity} </Text>
           <Text style={styles.count}>X</Text>
           <Text style={styles.count}>{item.price} </Text>
           <Text style={styles.count}>{item.total} </Text>
           
           
        </View>
      
        );
      };
        totalList(val) {

        return val.map((data,key) => {
          return (
              <Text>{data.title}:{data.text}</Text>
           
          )
        })
    
    }
    confirmOrderPress(){
        if((this.props.paymethod) && this.props.paymethod=='razorpay' ){
            alert("razorpay payment integration");
        }
        if((this.props.paymethod) && this.props.paymethod!='razorpay' ){
           fetch('http://techfactories.com/test2/index.php?route=api/order/add&api_token=' + this.props.token)
        .then((response) => response.json())
        .then((responseJson) => {

           
            alert(JSON.stringify(responseJson));

        }).catch((error) => {
            console.error(error);
            //dispatch(itemsHaveError(true))
        });  
        }
       
       
    }
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text>Order Details</Text>
      <FlatList
        data={this.props.cartval.products}
    
        renderItem={this._renderItem}
        
        scrollEnabled={true}
        keyExtractor={(item, index) => index.toString()}
    />
    {(this.props.carttotals.length > 0)&&(this.totalList(this.props.carttotals))} 
    <View style={styles.button_container}>
           <TouchableHighlight onPress={() => {
        var options = {
          description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: 'rzp_test_1DP5mmOlF5G5ag',
          amount: this.props.carttotals*100,
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
      <Text style = {styles.text}>Proceed to payment</Text>
      </TouchableHighlight>
</View>
          </View>
    )
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    heading: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        color: '#FFF',
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 1,
        height: 70, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent'
    },
    itemText: {
        color: '#000',
        fontWeight: 'normal',
        fontSize: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        overflow: 'hidden'
    },
    count: {
        flex: 1,
        color: 'red',
        fontWeight: 'normal',
        fontSize: 18,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 40,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        padding: 4,
        borderRadius: 4,
        flexDirection: "row",
        flex: 1
    },
    addbutton: {
        color: 'green',
        borderColor: 'green'
    },
    buttonwrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        paddingVertical: 0
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
      }

})
