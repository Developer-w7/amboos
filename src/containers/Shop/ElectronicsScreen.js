import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Products from '../data/Products'
import { electronics } from '../data/ProductData'
import { connect } from 'react-redux'

class ElectronicsScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Electronics'
    }
    render() {
        return (
            <View style={styles.container}>
                <Products products={electronics} onPress={()=>{alert('haiii')}} />
            </View>
        );
    }
}



export default ElectronicsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});