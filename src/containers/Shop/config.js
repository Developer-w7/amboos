import React, { Component} from 'react';
import { AsyncStorage } from "react-native"

let formdata = new FormData();
let token="";
formdata.append("username", "mobileApp");
formdata.append("key", "IFu3tSrg7QVawbbOyCV1E1a3pZe3j1UnCYnGlr4iSgtvDX5smqK72xUTstCMy20JuWZNnd5qws2gyswjcM1UFwmZVeGZLp1XgfPcvTrllu3SQugVWJKlmUxQrFYNBGLMDaBL34lS5yiHwZIgnCTugBichPfUnGbS1HVPOSs2u51EQArAOYyAg06RduVubpgLYF8G16j6D0foYk8rIcfCmWP6WdTlQ38eAyLY3fxTE4BvqsirFUbWprBySx2qEu0r");
 


  _getCategoriesFromApiAsync=() => {
    return fetch('http://techfactories.com/test2/index.php?route=api/login',{
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata
      })
      .then((response) => response.json())
      .then((responseJson) => {

           token=responseJson.api_token;
console.log(token);
      	

      })
      .catch((error) => {
        console.error(error);
      });
  }

  _getCategoriesFromApiAsync();

  
  export default {
  token_id: "68244ae2b371d748396207f04c"
}