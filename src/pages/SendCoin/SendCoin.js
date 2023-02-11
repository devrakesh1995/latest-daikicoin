import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';

import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  View, Text, SafeAreaView,
  Image, TouchableOpacity, TextInput, Dimensions
} from 'react-native';
import { scaleRatio, Images } from '../../helpers/index';
import colors from '../../config/colors';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../stylescss/styles';

const { width, height } = Dimensions.get('window');

class SendCoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      amount: '',
      otp_code: '',
      showQRScanner: false,
      fieldslogin: {},
      errorslogin: {},
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.users.sendCoinSuccess) {
      return {
        ...nextProps,
        address: '',
        amount: '',
        otp_code: '',

      }
    }
    if (nextProps.dashboard.getEmployeeHappinessSuccess) {
      return {
        ...nextProps,
        trackMessage: 'You can see getEmployeeHappinessSuccess here!'
      }
    } else {
      return {
        ...nextProps
      }
    }
  }

  onSuccess = e => {
    this.setState({ showQRScanner: false, address: e.data })
  };

  handleLoginInput = (name, text) => {
    this.setState({ [name]: text })
  }


  async componentDidMount() {

    this.props.dispatch(dashboardActions.getClientProfile());
    this.props.dispatch(userActions.navigationSave(this.props));
    const { navigation } = this.props;

  }

  sendFrom = (e) => {
    if (this.handleValidationLogin()) {
      let { address, amount } = this.state;
      this.props.dispatch(userActions.sendOtpTX({ address, amount, comment: "Send" }, this));
      this.setState({ temp: "asdf" })
    }
  }

  handleValidationLogin = () => {
    let address = this.state.address;
    let amount = this.state.amount;
    let errorslogin = {};
    let formIsValid = true;

    //address
    if (!address) {
      formIsValid = false;
      errorslogin["address"] = "Please enter valid address!";
    }
    //amount
    if (!amount) {
      formIsValid = false;
      errorslogin["amount"] = "Please enter amount!";
    }

    this.setState({ errorslogin: errorslogin });
    return formIsValid;
  }



  sendFromWithOTP = (e) => {
    let { address, amount, otp } = this.state;
    this.props.dispatch(userActions.sendFromWithOTP({ address, amount, otp, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }

  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }

  copyClipBoard = (text) => {
    Clipboard.setString(text);
    this.props.dispatch(alertActions.success("Copied successfully!"));

  }

  render() {
    let { users } = this.props;
    let { address, amount, errorslogin } = this.state;

    return (
      <SafeAreaView >
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000', }}>
          <View style={{ flex: 1, }} >

            <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'gray', }}>
              <View style={{ width: '42%', }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 40, }}>
                  <Image source={require('../../Statics/img/Wallet/back.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#FFF', justifyContent: 'center', fontWeight: 'bold', }}>SEND</Text>
              </View>
            </View>

            <View style={{ marginHorizontal: 18 }}>
              <Text style={{ fontSize: 22, marginTop: 20, textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Send Coin</Text>
            </View>

            <View style={{}}>
              <View style={{}}>

                {users && !users.sendCoinTXOTPSuccess ?
                  <>
                    <View style={{ width: '100%' }}>
                      <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'normal', color: '#FFF', fontWeight: 'bold' }}>To</Text>
                        <TouchableOpacity onPress={() => this.setState({ showQRScanner: true })} style={{ backgroundColor: '#FFF', width: 30, height: 30, borderRadius: 5 }}>
                          <Image style={{ width: 25, height: 25, alignSelf: 'center', marginTop: 2 }} source={require('../../Statics/img/Wallet/qr-code.png')} />
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.textemail}>Address</Text>
                      <View style={styles.TextInput}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                          placeholder="Enter Address"
                          placeholderTextColor='lightgray'
                          name="address"
                          selectTextOnFocus={true}
                          onChangeText={(text) => this.handleLoginInput("address", text)}
                          value={address}
                        />
                      </View>
                      {errorslogin && errorslogin["address"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["address"]}</Text> : null}

                      <Text style={styles.textemail}>Amount</Text>
                      <View style={styles.TextInput}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                          placeholder="Enter Amount"
                          placeholderTextColor='lightgray'
                          keyboardType='numeric'
                          name="amount"
                          onChangeText={(text) => this.handleLoginInput("amount", text)}
                          value={amount}
                        />
                      </View>
                      {errorslogin && errorslogin["amount"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["amount"]}</Text> : null}

                      <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ marginHorizontal: 20, marginTop: 45, elevation: 8, width: width - 42, borderRadius: 20 }}>
                        <View style={{ height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this.sendFrom()}>
                            <Text style={
                              styles.buttontext
                            }>SEND</Text>
                          </TouchableOpacity>
                        </View>
                      </LinearGradient>

                    </View>
                  </>
                  :
                  <>

                    <View style={{ marginHorizontal: 18 }}>
                      <Text style={{ fontSize: 22, marginTop: 25, textAlign: 'center', color: '#FFF', fontWeight: 'bold' }}>Send Coin Verification</Text>
                    </View>

                    <Text style={styles.textemail}>Enter OTP</Text>
                    <View style={styles.TextInput}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                        name="otp"
                        placeholderTextColor='lightgray'
                        placeholder="Enter otp"
                        keyboardType='numeric'
                        onChangeText={(text) => this.handleLoginInput("otp", text)}
                        value={this.state.otp}
                      />
                    </View>

                    <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ marginHorizontal: 20, marginTop: 45, elevation: 8, width: width - 42, borderRadius: 20, marginBottom: 100, }}>
                      <View style={{ height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity style={{ width: '100%' }}
                          onPress={() => this.sendFromWithOTP()}>
                          <Text style={
                            styles.buttontext
                          }>VERIFY AND PROCEED</Text>
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </>
                }
              </View>
            </View>
          </View>
        </View >
        {
          this.state.showQRScanner == true ?
            <View style={{ flex: 1, height: height, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', position: 'absolute' }}>
              <QRCodeScanner
                onRead={this.onSuccess}
                topContent={
                  <TouchableOpacity onPress={() => this.setState({ showQRScanner: false })}>
                    <Text style={{ fontSize: 20 }}>Cancel</Text>
                  </TouchableOpacity>
                }

              />
            </View> : <View />
        }
      </SafeAreaView >

    )
  }
}


function mapStateToProps(state) {

  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}

export default connect(mapStateToProps)(SendCoin);
