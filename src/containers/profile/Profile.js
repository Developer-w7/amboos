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
import { FetchData,currentLoggedUser,saveUserAccess} from '../../action';
import Orders from './Orders'
import deviceStorage from '../../services/deviceStorage';
let formdata = new FormData();

class Profile extends Component {

    constructor(props) {
        super(props);

    }

    static navigationOptions={
        drawerIcon:({tintColor})=>(
            <Icon style={{fontSize:24,color:tintColor }} name="ios-person" />
        )
    }
    state = {
        Data:[],
        token:'be0bcbc31f28641dedb77be3e1',
            
    }

    componentDidMount() {
        if(this.props.token==''){
            this.props.getApiToken();
        }
        this.props.getProfileDetails(this.props.token);
        this.props.getOrderDetails(this.props.token);
        this.props.getTransactionsDetails(this.props.token);
    
    }


render() {

        if(this.props.profileDetails){
            return (
                <ScrollView>
                    <View style={styles.container}> 
                        <Text style={styles.heading}>PROFILE </Text>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} locations={[.4,1]} colors={['#275CAA', '#05A14F']} style={styles.linearGradient}>
                        <View style={styles.profile_block}>
                        
                        <Text style={styles.itemText}>Name: {this.props.profileDetails.firstname}{this.props.profileDetails.lastname}</Text>
                        <Text style={styles.itemText}>Email: {this.props.profileDetails.email}</Text>
                        <Text style={styles.itemText}>Telephone: {this.props.profileDetails.telephone}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Settings')}>
                        <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        </View>
                        </LinearGradient>
                        <Orders orderData={this.props.orderDetails.orders}/>
                    </View>
                </ScrollView>
            )
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>No Data Found!</Text>
            </View>
        );
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
        fontSize: 16,
        color: '#666',
        textAlign:  'center',
        paddingVertical:20 
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

const mapStateToProps = (state) => {

return {
    profileDetails: state.profile_Data,
    orderDetails: state.order_Data,
    transactionDetails:state.transaction_Data,
    loggedUser:state.authUser.loggedUser,
    token:state.authUser.token

}
}

const mapDispatchToProps = (dispatch) => {
return {

    getProfileDetails: (token) => dispatch(FetchData(token,'GET_PROFILE_DETAILS')),
    getOrderDetails: (token) => dispatch(FetchData(token,'GET_ORDER_DETAILS')),
    getTransactionsDetails: (token) => dispatch(FetchData(token,'GET_TRANSACTION_DETAILS')),
    getCurrentUserData:()=>dispatch(currentLoggedUser()),
    getApiToken:()=>dispatch(saveUserAccess()),

    
}
}




export default connect(mapStateToProps, mapDispatchToProps)(Profile);