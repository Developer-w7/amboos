import { AsyncStorage } from 'react-native';

const deviceStorage = {

    async saveKey(key, value) {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async loadToken() {
        try {
          const value = await AsyncStorage.getItem('session_token');
          if (value !== null) {
            this.setState({
              token: value,
              isLoading: false
            });
          } else {
            this.setState({
                isLoading: false
            });
          }
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async deleteToken() {
        try{
          await AsyncStorage.removeItem('session_token')
          .then(
            () => {
              this.setState({
                token: ''
              })
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async loggedUser() {
      try {
        const value = await AsyncStorage.getItem('logged_user');
        if (value !== null) {
          this.setState({
            user_current:value
          })
        } else {
         return false;
        }
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
  },

};

export default deviceStorage;