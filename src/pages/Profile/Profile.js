import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, dashboardActions } from '../../_actions';
import {
  View, Text, Dimensions, Image, TouchableOpacity, Alert, TextInput
} from 'react-native';
import styles from '../../stylescss/styles';
import Screen from '../../components/Screen';
const { height, width } = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient';
import PINCode, {
  hasUserSetPinCode,
  resetPinCodeInternalStates,
  deleteUserPinCode,
} from "@haskkor/react-native-pincode";
import { SafeAreaView } from 'react-native-safe-area-context';
import { alertActions } from '../../_actions/alert.actions';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPinLock: false,
      PINCodeStatus: "choose",
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      submitEnquirySuccess: false,
      errorslogin: {},
      formData: {
        "currentpassword": "",
        "newpassword": "",
        "confirmnewpassword": ""
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.dashboard.submitEnquirySuccess) {
      return {
        ...nextProps,
        formData: {
          "currentpassword": "",
          "newpassword": "",
          "confirmnewpassword": ""
        }
      }
    }
    else {
      return {
        ...nextProps,

      }
    }

  }

  handleInput = (text, name) => {
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }

  handleLoginInput = (text) => {
    this.setState({ email: text })
  }


  updatePasswordSubmit = () => {
    if (this.handleValidationPassword()) {
      let { formData } = this.state;
      if (formData.confirmnewpassword != "" && formData.currentpassword != "" && formData.newpassword != "") {
        this.props.dispatch(dashboardActions.updatepassword(formData, this.props));
      }
      else {
        this.props.dispatch(alertActions.error("Field is not allowed to be empty"));
      }
    }
  }

  handleValidationPassword = () => {
    let { formData } = this.state;
    let errorslogin = {};
    let formIsValid = true;

    //Current Password
    if (formData.currentpassword == '') {
      formIsValid = false;
      errorslogin["currentpassword"] = "Please enter current password!";
    }
    //newpassword
    if (formData.newpassword == '') {
      formIsValid = false;
      errorslogin["newpassword"] = "Please enter new password!";
    }
    //confirmnewpassword
    if (formData.confirmnewpassword == '') {
      formIsValid = false;
      errorslogin["confirmnewpassword"] = "Please enter confirm newpassword!";
    }

    this.setState({ errorslogin: errorslogin });
    return formIsValid;
  }

  

  // _clearPin = async () => {
  //   await deleteUserPinCode();
  //   await resetPinCodeInternalStates();
  //   Alert.alert(null, "You have cleared your pin.", [
  //     {
  //       title: "Ok",
  //       onPress: () => {
  //       },
  //     },
  //   ]);
  // };

  // _finishProcess = async () => {
  //   const hasPin = await hasUserSetPinCode();
  //   if (hasPin) {
  //     Alert.alert(null, "You have successfully set/entered your pin.", [
  //       {
  //         title: "Ok",
  //         onPress: () => {
  //         },
  //       },
  //     ]);
  //     this.setState({ showPinLock: false });
  //   }
  // };

  render() {

    let { formData, errorslogin } = this.state;
    let { dashboard } = this.props;
    let { clientProfile, getEmployeeHistoryData, getEmployeeTrackerListData } = dashboard;


    return (
      <SafeAreaView>
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000', }}>
          <View style={{ flex: 1, }} >

            {/* {this.state.showPinLock == true ?
              <View style={{ flex: 1, position: 'absolute', height: '100%', width: '100%', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
                <PINCode
                  status={this.state.PINCodeStatus}
                  touchIDDisabled={true}
                  finishProcess={() => this._finishProcess()}
                />
              </View>
              : */}
            <>

              <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'gray', }}>
                <View style={{ width: '35%', }}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 40, }}>
                    <Image source={require('../../Statics/img/Wallet/back.png')} style={{ height: 25, width: 25 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, color: '#FFF', justifyContent: 'center', fontWeight: 'bold', }}>SECURITY</Text>
                </View>
              </View>


              <View style={{ marginVertical: 15 }}>

                <Text style={styles.textemail}>Current Password</Text>
                <View style={styles.TextInput}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                    placeholder="Current Password"
                    placeholderTextColor='lightgray'
                    fontSize={15}
                    name="currentpassword"
                    secureTextEntry={true}
                    value={formData.currentpassword}
                    onChangeText={(text) => this.handleInput(text, "currentpassword")}
                  />
                </View>
                {errorslogin && errorslogin["currentpassword"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["currentpassword"]}</Text> : null}

                <Text style={styles.textemail}>New Password</Text>
                <View style={styles.TextInput}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                    placeholder="New Password"
                    placeholderTextColor='lightgray'
                    fontSize={15}
                    name="newpassword"
                    secureTextEntry={true}
                    value={formData.newpassword}
                    onChangeText={(text) => this.handleInput(text, "newpassword")}
                  />
                </View>
                {errorslogin && errorslogin["newpassword"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["newpassword"]}</Text> : null}

                <Text style={styles.textemail}>Confirm Password</Text>
                <View style={styles.TextInput}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                    placeholder="Confirm Password"
                    placeholderTextColor='lightgray'
                    fontSize={15}
                    name="confirmnewpassword"
                    secureTextEntry={true}
                    value={formData.confirmnewpassword}
                    onChangeText={(text) => this.handleInput(text, "confirmnewpassword")}
                  />
                </View>
                {errorslogin && errorslogin["confirmnewpassword"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["confirmnewpassword"]}</Text> : null}

                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ marginHorizontal: 20, marginTop: 45, elevation: 8, width: width - 42, borderRadius: 20 }}>
                  <View style={{ height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableOpacity style={{ width: '100%' }}
                      onPress={() => this.updatePasswordSubmit()}>
                      <Text style={
                        styles.buttontext
                      }>UPDATE PASSWORD</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>

                {/* <Text style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 15,
                      textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'

                    }}>-----   OR   -----</Text> */}

                {/* <View style={{ borderWidth: 1, borderColor: '#131313', borderRadius: 11, marginHorizontal: 20, marginBottom: 20, marginTop: 20, elevation: 8 }}>
                      <View style={{ backgroundColor: '#0A142F', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#0A142F' }}>
                        <TouchableOpacity style={{ width: '100%' }}
                          onPress={() => this._showChoosePinLock()}>
                          <Text style={{ textAlign: 'center', color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Set PIN</Text>
                        </TouchableOpacity>
                      </View>
                    </View> */}

                {/* <TouchableOpacity onPress={() => this._clearPin()}>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 40,
                          borderRadius: 3,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 20
                        }}>

                        <Text style={{
                          textAlign: 'center',
                          color: '#1E90FF',
                          fontWeight: 'bold',
                          fontSize: 15,
                          textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'
                        }}>Clear PIN</Text>
                      </View>
                    </TouchableOpacity> */}

              </View>
            </>
            {/* } */}
          </View>
        </View>
      </SafeAreaView>
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
export default connect(mapStateToProps)(Profile);
