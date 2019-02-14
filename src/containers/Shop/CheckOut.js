import React, {Component} from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'
import thunk from 'redux-thunk';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    StatusBar,
    Button,
    SafeAreaView,
    Dimensions,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';

import {addwishItems, clearwishList, cartItems} from '../../action';
import t from 'tcomb-form-native';
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import CartItems from './CartItems';
var Form = t.form.Form;

var Gender = t.enums({M: 'Male', F: 'Female'});
var shipMethods = t.enums({"flat.flat": 'Flat Shipping Rate'});
var payMethods = t.enums({"razorpay": 'Credit Card/Debit Card/Net Banking (Razorpay)', "cod": 'Cash On Delivery'});
// var Country =t.enums({   'IT': 'Italy',     'US': 'United States' }); see the
// "Rendering options" section in this guide
var billing_options = {
    auto: 'placeholders',
    stylesheet: styles,
    fields: {
        birthDate: {
            mode: 'date' // display the Date field as a DatePickerAndroid
        },
        gender: {
            nullOption: {
                value: '',
                text: 'Choose your gender'
            }
        },
        // country: {   nullOption: {value: '', text: 'Choose your Country'} }
    }
};
var billing_details = t.struct({
    First_Name: t.String,
    Last_Name: t.String,
    Company: t.maybe(t.String),
    Address: t.String,
    City: t.String,
    PostalCode: t.Number,
    country: t.String,
    State: t.String,
    // usefordelivery: t.Boolean  birthDate: t.Date, gender: Gender // enum
});

var delivery_options = {
    auto: 'placeholders',
    stylesheet: styles,
    fields: {
        birthDate: {
            mode: 'date' // display the Date field as a DatePickerAndroid
        },
        gender: {
            nullOption: {
                value: '',
                text: 'Choose your gender'
            }
        }
    }
};
var delivery_details = t.struct({
    First_Name: t.String,
    Last_Name: t.String,
    Company: t.maybe(t.String),
    Address: t.String,
    City: t.String,
    PostalCode: t.Number,
    country: t.String,
    State: t.String
});
var shipping_method_options = {
    auto: 'placeholders',
    stylesheet: styles,
    fields: {
        method_shipping: {
            nullOption: {
                value: '',
                text: 'Choose Shipping Method'
            }
        }
    }
};
var shipping_method_details = t.struct({method_shipping: shipMethods});
var payment_method_options = {
    auto: 'placeholders',
    stylesheet: styles,
    fields: {
        method_payment: {
            nullOption: {
                value: '',
                text: 'Choose Payment Method'
            }
        }
    }
};
var payment_method_details = t.struct({method_payment: payMethods});
class CheckOut extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        isloading: false,
        collapsed: false,
        paymentDetail: {},
        savePaymentDetail: false,
        shippingDetail: {},
        saveShippingDetail: false,
        shippingMethods: [],
        deliveryMethods: [],
        paymentMethods: [],
        shippingmethodSaved: false,
        paymentmethodSaved: false,
        paymethod:'',
        cartlist:[],
        paymentmethodUpdated:false
    }
    static navigationOptions = {
        drawerIcon: () => (<Icon
            style={{
            fontSize: 24,
            color: "#000"
        }}
            name="ios-heart"/>)
    }

    componentDidMount() {
        this._getCartItems();
        // give focus to the name textbox

    }

    onChange(value) {
        // recalculate the type only if strictly necessary let type =
        // value.usefordelivery; if(type){ this.setState({collapsed:true}) }
    }
    billingPress() {
        var value = this.refs.bill.getValue();
        if (value) {

            // this.setState({isloading:true}); alert(JSON.stringify(value));
            let formdata = new FormData();
            formdata.append("firstname", value.First_Name);
            formdata.append("lastname", value.Last_Name);
            formdata.append("company", value.Company);
            formdata.append("address_1", value.Address);
            formdata.append("city", value.City);
            formdata.append("country_id", value.country);
            formdata.append("zone_id", value.State);
            formdata.append("postcode", value.PostalCode);
            fetch('http://techfactories.com/test2/index.php?route=api/payment/address&api_token=' + this.props.token, {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formdata
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({isloading: false});
                if (responseJson.success) {
                    this.setState({paymentDetail: value, savePaymentDetail: true});
                    alert(JSON.stringify(responseJson.success));
                }
                
                // console.log(responseJson);

            }).catch((error) => {
                console.error(error);
                //dispatch(itemsHaveError(true))
            });
        } else {
            alert("fill all required filelds");
        }

    }
    shipPress() {
        var shipvalue = this.refs.ship.getValue();
        if (shipvalue) {

            // alert(JSON.stringify(value)); alert(JSON.stringify(value));
            let formdata = new FormData();
            formdata.append("firstname", shipvalue.First_Name);
            formdata.append("lastname", shipvalue.Last_Name);
            formdata.append("company", shipvalue.Company);
            formdata.append("address_1", shipvalue.Address);
            formdata.append("city", shipvalue.City);
            formdata.append("country_id", shipvalue.country);
            formdata.append("zone_id", shipvalue.State);
            formdata.append("postcode", shipvalue.PostalCode);
            fetch('http://techfactories.com/test2/index.php?route=api/shipping/address&api_token=' + this.props.token, {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formdata
            }).then((response) => response.json()).then((responseJson) => {
                if (responseJson.success) {
                    this.setState({shippingDetail: shipvalue, saveShippingDetail: true});
                    alert(JSON.stringify(responseJson.success));
                }
                
                // console.log(responseJson);

            }).catch((error) => {
                console.error(error);
                //dispatch(itemsHaveError(true))
            });
        } else {
            alert("please fill all required fields");
        }

    }
    _getDeliverymethodsFromApiAsync = () => {
        return fetch('http://techfactories.com/test2/index.php?route=api/shipping/methods&api_token=' + this.props.token)
        .then((response) => response.json())
        .then((responseJson) => {
            // alert(JSON.stringify(responseJson)); this.setState({ Data:responseJson.data})
            // console.log(this.state.Data);
        }).catch((error) => {
            console.error(error);
        });
    }
    _getPaymentmethodsFromApiAsync = () => {
        let temp = [];
        return fetch('http://techfactories.com/test2/index.php?route=api/payment/methods&api_token=' + this.props.token)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            //         if(responseJson.payment_methods &&
            // responseJson.payment_methods.length >0){             this.setState({
            // paymentMethods: [...this.state.paymentMethods,responseJson.payment_methods]
            // }); //             responseJson.payment_methods.map((item,index)=>{ //
            //          this.setState({ paymentMethods: [...this.state.paymentMethods,item]
            // }); //                 // this.setState({ paymentMethods:
            // [...this.state.paymentMethods, 'new value'] }); // // let
            // val={code:item.code,title:item.title}; // // this.setState({ paymentMethods:
            // this.state.paymentMethods.concat(val) }) //             });         }
            // alert(JSON.stringify(responseJson.payment_methods)); this.setState({
            // Data:responseJson.data}) console.log(this.state.Data);
        }).catch((error) => {
            console.error(error);
        });
    }
    deliveryMethodOpt() {

        // alert("check the delivery methods");
        this._getDeliverymethodsFromApiAsync();
    }
    deliveryMethodPress() {

        var shipmethodvalue = this.refs.shippmethod.getValue();
        if (shipmethodvalue) {

            let formdata = new FormData();
            formdata.append("shipping_method", shipmethodvalue.method_shipping);
            fetch('http://techfactories.com/test2/index.php?route=api/shipping/method&api_token=' + this.props.token, {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formdata
            }).then((response) => response.json()).then((responseJson) => {

                if (responseJson.success) {
                    this.setState({shippingmethodSaved: true});
                    alert(responseJson.success);
                }
                if (responseJson.error) {
                    alert(responseJson.error);
                }
                // alert(JSON.stringify(this.state));
                //    alert(JSON.stringify(responseJson)); console.log(responseJson);

            }).catch((error) => {
                console.error(error);
                //dispatch(itemsHaveError(true))
            });

        } else {
            alert("Select Shipping Method");
        }
        // alert(JSON.stringify(shipmethodvalue));
    }
    paymentMethodOpt() {

        // alert("check the payment methods"); alert(JSON.stringify(this.state));
        this._getPaymentmethodsFromApiAsync();
    }
    paymentMethodPress() {
        var paymethodvalue = this
            .refs
            .paymethod
            .getValue();
        if (paymethodvalue) {
            let formdata = new FormData();
            formdata.append("payment_method", paymethodvalue.method_payment);
            fetch('http://techfactories.com/test2/index.php?route=api/payment/method&api_token=' + this.props.token, {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formdata
            }).then((response) => response.json()).then((responseJson) => {
                if(responseJson.success){
                    this.setState({paymentmethodUpdated:true});
                    this.setState({paymethod:paymethodvalue.method_payment});
                    // this.confirmOrderOpt();
                }
                // if(responseJson.success){     this.setState({ shippingmethodSaved:true}); }
                // if(responseJson.error){     alert(responseJson.error); }
                // alert(JSON.stringify(responseJson));
                //    alert(JSON.stringify(responseJson)); console.log(responseJson);

            }).catch((error) => {
                console.error(error);
                //dispatch(itemsHaveError(true))
            });

        } else {
            alert("Please select the payment method");
        }
        // alert("payment method press"); var shipmethodvalue =
        // this.refs.shippmethod.getValue(); if(shipmethodvalue){
        // this.setState({isloading:true});     let formdata = new FormData();
        // formdata.append("shipping_method",shipmethodvalue.method_shipping);
        // fetch('http://techfactories.com/test2/index.php?route=api/shipping/method&api_
        // token='+this.props.token, {     method: 'post',     headers: {
        // 'Content-Type': 'multipart/form-data',     },     body: formdata })
        // .then((response) => response.json()) .then((responseJson) => {
        // this.setState({isloading:false});     if(responseJson.success){
        // this.setState({ shippingmethodSaved:true});     }     if(responseJson.error){
        //         alert(responseJson.error);     } //
        // alert(JSON.stringify(responseJson)); //
        // alert(JSON.stringify(responseJson));     // console.log(responseJson); })
        // .catch((error) => {     console.error(error);
        // //dispatch(itemsHaveError(true)) }); }else{     alert("Select Shipping
        // Method"); } alert(JSON.stringify(shipmethodvalue));
    }
   
    confirmOrderOpt(){
        if(this.state.paymentmethodUpdated){

       
         fetch('http://techfactories.com/test2/index.php?route=api/cart/products&api_token='+this.props.token)
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson.products.length > 0){
          this.setState({
            cartlist:responseJson
          });
          alert(JSON.stringify(responseJson));
            // items=responseJson.data.products;
            // console.log(items);
            // dispatch({ type:'GET_WISHLIST',
            // payload:responseJson.data.products});
           
        }
       
    })
    .catch((error) => {
        console.error(error);
        //dispatch(itemsHaveError(true))
    });
    }

}
_getCartItems(){
    fetch('http://techfactories.com/test2/index.php?route=api/cart/products&api_token='+this.props.token)
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson.products.length > 0){
          this.setState({
            cartlist:responseJson
          });
          console.log(this.state);
        //   alert(JSON.stringify(responseJson.totals));
            // items=responseJson.data.products;
            // console.log(items);
            // dispatch({ type:'GET_WISHLIST',
            // payload:responseJson.data.products});
           
        }
       
    })
    .catch((error) => {
        console.error(error);
        //dispatch(itemsHaveError(true))
    }); 
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
    //     totalList() {

    //     return this.state.cartlist.totals.map((data) => {
    //       return (
    //           <Text>{data.title}:{data.text}</Text>
           
    //       )
    //     })
    
    // }
    render() {

        return (
            <ScrollView>
                {/* {this.state.isloading &&
    <View style={styles.loading}>
      <ActivityIndicator size='large' color="#0000ff" />
    </View>
} */}
                <Text
                    style={{ textAlign: 'center',
                    fontSize: 22,
                    fontWeight: 'bold',
                    paddingVertical: 18,
                    color: '#000'
                }}>CHECKOUT</Text>

                <Collapse
                    disabled={this.state.collapsed}
                    isCollapsed={this.state.savePaymentDetail?'false':'true'}
                    style={{  marginTop: 1}}>
                    <CollapseHeader >
                        <LinearGradient
                            start={{x: 0,
                            y: 0
                        }}
                            end={{ x: 0,
                            y: 1
                        }}
                            locations={[.1, .6]}
                            colors={['#FF0000', '#6C0707']}
                            style={{ flex: 1
                        }}>
                            <View>
                                <Text style={styles.heading}>PAYMENT DETAILS</Text>
                            </View>
                        </LinearGradient>
                    </CollapseHeader>
                    <CollapseBody
                        style={{  paddingHorizontal: 20,
                        paddingVertical: 10
                    }}>

                        <View style={styles.container}>

                            <Form ref="bill" type={billing_details} options={billing_options}/>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => this.billingPress()}>
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </CollapseBody>
                </Collapse>

                <Collapse style={{ marginTop: 1
                }}   >
                    <CollapseHeader>
                        <LinearGradient
                            start={{ 
                            x: 0,
                            y: 0
                        }}
                            end={{  
                            x: 0,
                            y: .6
                        }}
                            locations={[.1, 1]}
                            colors={['#FF0000', '#6C0707']}
                            style={{ flex: 1
                        }}>
                            <View>
                                <Text style={styles.heading}>SHIPPING DETAILS</Text>
                            </View>
                        </LinearGradient>
                    </CollapseHeader>
                    <CollapseBody
                        style={{  paddingHorizontal: 20,
                        paddingVertical: 10
                    }}>

                        <View style={styles.container}>

                            <Form ref="ship" type={delivery_details} options={delivery_options}/>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => this.shipPress()}>
                            <Text style={styles.buttonText}>UPDATE</Text>
                        </TouchableOpacity>
                    </CollapseBody>
                </Collapse>

                <Collapse
                    onToggle={() => this.deliveryMethodOpt()}
                    style={{ marginTop: 1 }}>
                    <CollapseHeader>
                        <LinearGradient
                            start={{  x: 0,
                            y: 0 }}
                           
                       
                            end={{  x: 0,
                            y: .6 }}
                      
                            locations={[.1, 1]}
                            colors={['#FF0000', '#6C0707']}
                            style={{
                            flex: 1
                        }}>
                            <View>
                                <Text style={styles.heading}>DELIVERY METHOD</Text>
                            </View>
                        </LinearGradient>
                    </CollapseHeader>
                    <CollapseBody
                        style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }}>
                        <View style={styles.container}>

                            <Form
                                ref="shippmethod"
                                type={shipping_method_details}
                                options={shipping_method_options}/>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.deliveryMethodPress()}>
                            <Text style={styles.buttonText}>UPDATE</Text>
                        </TouchableOpacity>
                    </CollapseBody>
                </Collapse>

                <Collapse
                    onToggle={() => this.paymentMethodOpt()}
                    style={{
                    marginTop: 1
                }}>
                    <CollapseHeader>
                        <LinearGradient
                            start={{
                            x: 0,
                            y: 0
                        }}
                            end={{
                            x: 0,
                            y: .6
                        }}
                            locations={[.1, 1]}
                            colors={['#FF0000', '#6C0707']}
                            style={{
                            flex: 1
                        }}>
                            <View>
                                <Text style={styles.heading}>PAYMENT METHOD</Text>
                            </View>
                        </LinearGradient>
                    </CollapseHeader>
                    <CollapseBody
                        style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }}>

                        <View style={styles.container}>
                            <Form
                                ref="paymethod"
                                type={payment_method_details}
                                options={payment_method_options}/>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.paymentMethodPress()}>
                            <Text style={styles.buttonText}>UPDATE</Text>
                        </TouchableOpacity>
                    </CollapseBody>
                </Collapse>
                {(this.state.paymentmethodUpdated)&&(<CartItems cartval={this.state.cartlist} carttotals={this.state.cartlist.totals?this.state.cartlist.totals:[]} token={this.props.token} paymethod={this.state.paymethod}></CartItems>)}
                {/* <Collapse
                onToggle={() => this.confirmOrderOpt()}
                    style={{   marginTop: 1
                }} isActive={true}>
                    <CollapseHeader>
                        <LinearGradient
                            start={{
                            x: 0,
                            y: 0
                        }}
                            end={{
                            x: 0,
                            y: .6
                        }}
                            locations={[.1, 1]}
                            colors={['#FF0000', '#6C0707']}
                            style={{
                            flex: 1
                        }}>
                            <View>
                                <Text style={styles.heading}>CONFIRM ORDER</Text>
                            </View>
                        </LinearGradient>
                    </CollapseHeader>
                    <CollapseBody
                        style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    }}>

                        <View style={styles.container}>
                        <FlatList
                            data={this.state.cartlist.products}
                        
                            renderItem={this._renderItem}
                           
                            scrollEnabled={true}
                            keyExtractor={(item, index) => index.toString()}
                        />
                       {(this.state.cartlist.products)&& (this.state.cartlist.products.length >0 ) && this.totalList()}

                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.confirmOrderPress()}>
                            <Text style={styles.buttonText}>CONFIRM ORDER</Text>
                        </TouchableOpacity>
                    </CollapseBody>
                </Collapse> */}

                {/* {(this.state.cartlist.length > 0)&&(this.state.cartlist.products)&& (this.state.cartlist.products.length >0 ) && <CartItems cartval={this.state.cartlist}></CartItems>} */}
            
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {

    return {token: state.authUser.token}
}

export default connect(mapStateToProps, null)(withNavigation(CheckOut));

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
    }
})

// <TouchableOpacity onPress={() =>
// this.props.removeItem({"product_id":item.product_id})} style={{flex: 1}}><Icon
//  name="md-close" size={20} /></TouchableOpacity>