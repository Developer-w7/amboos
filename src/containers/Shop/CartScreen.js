import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class CartScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                 <Text>Cart Screen!!</Text>
            </View>
        );
    }
}
export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});