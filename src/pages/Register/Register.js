import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import {
  View, Text, Dimensions, TouchableOpacity,
  Image, ImageBackground, TextInput, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";
import styles from '../../stylescss/styles';

const { height, width } = Dimensions.get('window')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      fieldslogin: {},
      errorslogin: {},
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.users.UserLoginFailure) {
      return {
        ...nextProps,
        failureMSG: 'Please enter valid username!'
      }
    }
    if (nextProps.users.UserLoginOTPFailure) {
      return {
        ...nextProps,
        failureOTPMSG: 'Invalid OTP or expired!'
      }
    }
    if (nextProps.users.UserLoginEmailSuccess) {
      return {
        ...nextProps,
        showLogin: false
      }
    }
    else {
      return {
        ...nextProps
      }
    }
  }
  async componentDidMount() {
    await AsyncStorage.removeItem('UserData');
  }
  handleLoginInput = (text) => {
    this.setState({ email: text })
  }
  handleLoginInputPassword = (text) => {
    this.setState({ password: text })
  }

  submitLogin = () => {
    if (this.handleValidationLogin()) {
      let data = {
        email: this.state.email,
        password: this.state.password,
      }
      this.props.dispatch(userActions.register(data, this.props));
    }
  }

  handleValidationLogin = () => {
    let email = this.state.email;
    let password = this.state.password;
    let errorslogin = {};
    let formIsValid = true;

    //Email
    if (!email || email === "") {
      formIsValid = false;
      errorslogin["email"] = "Please enter email!";
    }

    if (typeof email !== "undefined" && email !== "") {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errorslogin["email"] = "Enter valid email Address!";
      }
    }

    //Password
    if (!password) {
      formIsValid = false;
      errorslogin["password"] = "Please enter password!";
    }
    this.setState({ errorslogin: errorslogin });
    return formIsValid;
  }

  // onSubmitOTP = () => {
  //   const { users } = this.props;
  //   const { UserEmailToken } = users;
  //   if (this.state.otp !== 'NaN') {
  //     let data = {
  //       email: this.state.email,
  //       password: this.state.password,
  //       otp: this.state.otp
  //     }
  //     this.props.dispatch(userActions.validateOtp(data, this.props));
  //   }
  // }



  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }
  gotoIntroScreen = (router) => {
    this.props.navigation.navigate(router)
  }
  render() {
    
    let { email, password, errorslogin } = this.state;

    return (
      <SafeAreaView>
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000', }}>
          <ImageBackground source={require('../../Statics/img/Wallet/backimg.png')} style={{ height: '100%', width: '100%' }}>

            <View style={{}} >
              <ScrollView>
                <View style={{}}>

                  {this.state.showLogin ?
                    <>
                      <View style={{}}>
                        <View style={styles.container}>
                          <Text style={styles.daiki}>Daiki</Text>
                          <Text style={styles.coin}>Coin </Text>
                        </View>
                        <View style={styles.imageview}>
                          <Image style={styles.image} source={require('../../Statics/img/Wallet/daikilogo.png')} />
                        </View>

                        <View style={{}}>
                          <Text style={styles.textsignin}>SIGN UP</Text>

                          <Text style={styles.textemail}>Email</Text>
                          <View style={styles.TextInput}>
                            <TextInput
                              style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                              placeholder="Enter Email"
                              placeholderTextColor='lightgray'
                              fontSize={15}
                              name="email"
                              onChangeText={(text) => this.handleLoginInput(text)}
                              value={email}
                            />
                          </View>
                          {errorslogin && errorslogin["email"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["email"]}</Text> : null}

                          <Text style={styles.textemail}>Password</Text>
                          <View style={styles.TextInput}>
                            <TextInput
                              style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                              placeholder="Enter Password"
                              placeholderTextColor='lightgray'
                              fontSize={15}
                              name="password"
                              secureTextEntry={true}
                              onChangeText={(text) => this.handleLoginInputPassword(text)}
                              value={password} />
                          </View>
                          {errorslogin && errorslogin["password"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["password"]}</Text> : null}

                          <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={styles.gradientlogin}>
                            <View style={styles.button}>
                              <TouchableOpacity style={{ width: '100%' }}
                                onPress={() => this.submitLogin()}>
                                <Text style={styles.buttontext}> Sign Up </Text>
                              </TouchableOpacity>
                            </View>
                          </LinearGradient>

                          <TouchableOpacity style={{
                            height: 35,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingTop: 10,
                            marginBottom: 15,
                          }}
                            onPress={() => this.gotoIntroScreen('Login')} >
                            <Text style={styles.text7}> Already have an Account? </Text>
                            <LinearTextGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} locations={[0, 1, 2, 3]} colors={["#EF96FF", "#FFAA6C", "#8AD4EC", "#EF96FF"]} >
                              <Text style={styles.text8}> Sign In </Text>
                            </LinearTextGradient>
                          </TouchableOpacity>

                        </View>
                      </View>
                    </>
                    :
                    <>
                      <View style={{}}>
                        <View style={styles.container}>
                          <Text style={styles.daiki}>Daiki</Text>
                          <Text style={styles.coin}>Coin </Text>
                        </View>
                        <View style={styles.imageview}>
                          <Image style={styles.image} source={require('../../Statics/img/Wallet/daikilogo.png')} />
                        </View>

                        <Text style={styles.textsignin}>VERIFICATION</Text>
                        <Text style={styles.textemail}>
                          OTP sent to <Text style={{ fontWeight: 'bold', color: '#FFF' }}>{email}</Text>
                        </Text>

                        <View style={styles.TextInput}>
                          <TextInput
                            style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                            placeholder="Enter OTP"
                            placeholderTextColor='lightgray'
                            keyboardType='numeric'
                            fontSize={15}
                            name="otp"
                            onChangeText={(text) => this.handleVerificationInput(text)}
                            value={this.state.otp} />
                        </View>

                        {/* <Text style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginTop: 15,
                          width: 350,
                          textAlign: 'center',
                          color: '#34cceb', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'
                        }}>Expire in: 1:20</Text>
                        <TouchableOpacity onPress={() => this.onSubmitOTP()}>
                          <View
                            style={{
                              width: 220,
                              height: 50,
                              backgroundColor: '#3498eb',
                              borderRadius: 50,
                              marginTop: 25,
                              marginLeft: 70, elevation: 8

                            }}

                          >
                            <Text style={{
                              marginTop: 13,
                              textAlign: 'center',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'

                            }}>VERIFY AND PROCEED</Text>
                          </View>
                        </TouchableOpacity> */}

                      </View>
                    </>

                  }
                </View>

              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    )
  }
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { users } = state;
  return {
    loggingIn,
    users
  };
}
export default connect(mapStateToProps)(Login);