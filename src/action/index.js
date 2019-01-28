import React, { Component} from 'react';
import { AsyncStorage } from "react-native"


let formdata = new FormData();
formdata.append("username", "mobileApp");
formdata.append("key", "IFu3tSrg7QVawbbOyCV1E1a3pZe3j1UnCYnGlr4iSgtvDX5smqK72xUTstCMy20JuWZNnd5qws2gyswjcM1UFwmZVeGZLp1XgfPcvTrllu3SQugVWJKlmUxQrFYNBGLMDaBL34lS5yiHwZIgnCTugBichPfUnGbS1HVPOSs2u51EQArAOYyAg06RduVubpgLYF8G16j6D0foYk8rIcfCmWP6WdTlQ38eAyLY3fxTE4BvqsirFUbWprBySx2qEu0r");
 
export function cartItems(cartitem,type) {
    return {
        type: type,
        payload:cartitem
    };
}
export function dropItems(product_id , type) {
    return {
        type: type,
        payload:product_id
    };
}
export function removeItems(product_id , type) {
    return {
        type: type,
        payload:product_id
    };
}

export function itemsHaveError(bool) {
    return {
        type: 'ITEMS_HAVE_ERROR',
        hasError: bool
    };
}
export function itemsAreLoading(bool) {
    return {
        type: 'ITEMS_ARE_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(item) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        token:item
    };
}

_storeData = async (token) => {
  try {
    await AsyncStorage.setItem('session_token', token);
  } catch (error) {
    // Error saving data
  }
}

export function itemsFetchData() {
    return (dispatch) => {
       

        fetch('http://techfactories.com/test2/index.php?route=api/login',{
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
      })
      .then((response) => response.json())
      .then((responseJson) => {

       _storeData(responseJson.api_token).then(() =>{
          dispatch(itemsFetchDataSuccess(responseJson));
       } );
      

        

      })
      .catch((error) => {
        console.error(error);
        //dispatch(itemsHaveError(true))
      });


    };
}
