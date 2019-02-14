import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import thunk from 'redux-thunk';
import { FetchData,currentLoggedUser,getUserToken,saveCurrentUser,loggedUser} from '../../action';
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'

class LoginForm extends Component {
  constructor(props){
    super(props);
    // this.props.getCurrentUserData();
  }
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onLoginPress: PropTypes.func.isRequired,
    onSignupLinkPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    fullName: ''
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }
  _doLogin=(email,password)=>{
    let formdata = new FormData();
    if(email =='' || password ==''){

      alert('Please fill all fields!!!...');

  }else{
    formdata.append("email", email);
    formdata.append("password",password);
    
    fetch('http://techfactories.com/test2/index.php?route=api/customerlogin&api_token='+this.props.token, {
      method: 'post',
      headers: {
          'Content-Type': 'multipart/form-data',
      },
      body: formdata
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success){
          this.setState({isLoggedIn:true,isLoading:false});
          this.props.saveCurrUser(responseJson.data);
          this.props.navigation.navigate('Dashboard');
        }else{
          alert('some error occured please try again later...');
          this.props.navigation.navigate('Login');
        }
       
      })
      .catch((error) => {

        console.log(error);
        this.props.navigation.navigate('Login');
    });
  }
    // alert(JSON.stringify(this.props.usertoken));
  };

  render () {
    const { email, password } = this.state
    const { isLoading, onSignupLinkPress, onLoginPress,token } = this.props
    const isValid = email !== '' && password !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <CustomTextInput
            name={'email'}
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            name={'password'}
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => this._doLogin(email, password)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={'Log In'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.signupLink}
            onPress={onSignupLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Forget Password?'}
          </Text>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.signupLink}
            onPress={onSignupLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Not registered yet?'.toUpperCase()}
          </Text>

        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {

  return {
     
      // currentuser:state.currentUser,
      // usertoken:state.authUser,
      token:state.authUser.token,
      error:state.authUser.error,
      loggedIn:state.authUser.loggedIn,
      loggedUser:state.authUser.loggedUser

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  
      
        // getCurrentUserData:()=>dispatch(getUserToken()),
        saveCurrUser:(data)=>dispatch(loggedUser(data)),
  
        
  }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginForm));
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 140,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 10
  }
  
})
