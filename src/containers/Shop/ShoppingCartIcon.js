import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from "react-native";

import { withNavigation } from 'react-navigation'

import { connect } from 'react-redux'
import thunk from 'redux-thunk';
import Icon from 'react-native-vector-icons/Ionicons'

const ShoppingCartIcon = (props) => (
    <View style={[{ padding: 5 }, Platform.OS == 'android' ? styles.iconContainer : null]}>
    <TouchableOpacity onPress={() => props.navigation.navigate('CartScreen')}>
        <View style={{
            position: 'absolute', height: 30, width: 30, borderRadius: 15, backgroundColor: 'rgba(95,197,123,0.8)', right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000,

        }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.cartItems.length}</Text>
        </View>
        <Icon style={{color: '#64A644',paddingHorizontal: 4}}  name="ios-cart" size={30} />
        </TouchableOpacity>
    </View>
)



const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems
    }
}

export default connect(mapStateToProps)(withNavigation(ShoppingCartIcon));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        paddingLeft: 20, paddingTop: 10, marginRight: 5
    }
});

