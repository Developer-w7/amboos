import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import Products from '../data/Products'
import { books } from '../data/ProductData'
import { connect } from 'react-redux'

class BooksScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Books'
    }
    render() {
        return (
            <View style={styles.container}>
                <Products products={books} onPress={()=>{alert('haiii')}} />
            </View>
        );
    }
}



export default BooksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});