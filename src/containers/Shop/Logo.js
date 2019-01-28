import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image
} from "react-native";

import { withNavigation } from 'react-navigation'

import { connect } from 'react-redux'
import thunk from 'redux-thunk';
import Icon from 'react-native-vector-icons/Ionicons'

const Logo = (props) => (
    <View style={[{ padding: 5}, Platform.OS == 'android' ? styles.iconContainer : null]}>
    
    <Image style={styles.logo} source={require('./images/logo.png')}/>
    </View>
)





export default Logo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
    	 flex: 1,
       alignItems: 'center',
        
    },
    logo:{
    width: 110,

    resizeMode:'contain'
    }
});

