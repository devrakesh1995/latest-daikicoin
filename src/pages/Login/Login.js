import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import {
  View, Text, Dimensions,
  TouchableOpacity, ImageBackground, TextInput, Image
} from 'react-native';
import styles from '../../stylescss/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";

const { height, width } = Dimensions.get('window')
class Login extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.state = {
      email: '',
      otp_code: '',
      password: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      time: {},
      seconds: 120,
      fieldslogin: {},
      errorslogin: {},
    },

      this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
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

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }
  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }
  async componentDidMount() {

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
      this.props.dispatch(userActions.userlogin(data, this.props));
      this.startTimer()
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
      errorslogin["email"] = "Please enter email";
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


  onSubmitOTP = () => {
    if (this.handleValidationOtp()) {
      const { users } = this.props;
      const { UserEmailToken } = users;
      if (this.state.otp !== 'NaN') {
        let data = {
          email: this.state.email,
          password: this.state.password,
          otp: this.state.otp
        }

        this.props.dispatch(userActions.validateOtp(data, this.props));
      }
    }
  }

  handleValidationOtp = () => {
    let otp = this.state.otp;
    let errorslogin = {};
    let formIsValid = true;

    //OTP
    if (!otp) {
      formIsValid = false;
      errorslogin["otp"] = "Please enter otp!";
    }
    this.setState({ errorslogin: errorslogin });
    return formIsValid;
  }


  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }

  gotoIntroScreen = (router) => {
    this.props.navigation.navigate(router)
  }



  render() {

    let { email, password, otp, errorslogin } = this.state;

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
                          <Text style={styles.textsignin}>SIGN IN</Text>
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

                          <TouchableOpacity
                            onPress={() => this.gotoIntroScreen('Forgot')}
                            style={styles.forgot} >
                            <Text style={styles.text5}> Forgot Password? </Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray' }} />
                          </TouchableOpacity>

                          <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={styles.gradientlogin}>
                            <View style={styles.button}>
                              <TouchableOpacity style={{ width: '100%' }}
                                onPress={() => this.submitLogin()}>
                                <Text style={styles.buttontext}> Sign In </Text>
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
                            onPress={() => this.gotoIntroScreen('Register')} >
                            <Text style={styles.text7}> Don't have an Account? </Text>
                            <LinearTextGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} locations={[0, 1, 2, 3]} colors={["#EF96FF", "#FFAA6C", "#8AD4EC", "#EF96FF"]} >
                              <Text style={styles.text8}>Sign Up </Text>
                            </LinearTextGradient>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray' }} />
                          </TouchableOpacity>
                        </View>
                      </View>

                    </>
                    :

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
                      {errorslogin && errorslogin["otp"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["otp"]}</Text> : null}

                      <View style={{ alignSelf: 'center', marginTop: 35 }}>
                        <LinearTextGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} locations={[0, 1, 2, 3]} colors={["#EF96FF", "#FFAA6C", "#8AD4EC", "#EF96FF"]} >
                          <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold', paddingVertical: 50
                          }}>Expire in: {this.state.time.m} : {this.state.time.s}</Text>
                        </LinearTextGradient>
                      </View>
                      {/* <TouchableOpacity style={styles.resendview}>
                          <LinearTextGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} locations={[0, 1, 2, 3]} colors={["#EF96FF", "#FFAA6C", "#8AD4EC", "#EF96FF"]} >
                            <Text style={styles.resendtext}>Resend OTP</Text>
                          </LinearTextGradient>
                        </TouchableOpacity> */}

                      <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={styles.gradientlogin}>
                        <View style={styles.button}>
                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this.onSubmitOTP()}>
                            <Text style={styles.buttontext}> Veify and Proceed </Text>
                          </TouchableOpacity>
                        </View>
                      </LinearGradient>
                    </View>

                  }

                </View>
              </ScrollView>
            </View>

          </ImageBackground>
        </View >
      </SafeAreaView >
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