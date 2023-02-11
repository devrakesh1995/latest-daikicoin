import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, dashboardActions } from '../../_actions';
import {
  View, Text, Dimensions, Image, TouchableOpacity, Alert, TextInput
} from 'react-native';

import Screen from '../../components/Screen';
const { height, width } = Dimensions.get('window')

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
  gotoIntroScreen = () => {
    this.props.navigation.navigate('Intro1')
  }

  handleLoginInput = (text) => {
    this.setState({ email: text })
  }

  updatePasswordSubmit = () => {
    let { formData } = this.state;
    if (formData.confirmnewpassword != "" && formData.currentpassword != "" && formData.newpassword != "") {
      this.props.dispatch(dashboardActions.updatepassword(formData, this.props));
    }
    else {
      this.props.dispatch(alertActions.error("Field is not allowed to be empty"));
    }
  }

  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }

  _showChoosePinLock = () => {
    this.setState({ PINCodeStatus: "choose", showPinLock: true });
  };

  _clearPin = async () => {
    await deleteUserPinCode();
    await resetPinCodeInternalStates();
    Alert.alert(null, "You have cleared your pin.", [
      {
        title: "Ok",
        onPress: () => {
        },
      },
    ]);
  };

  _finishProcess = async () => {
    const hasPin = await hasUserSetPinCode();
    if (hasPin) {
      Alert.alert(null, "You have successfully set/entered your pin.", [
        {
          title: "Ok",
          onPress: () => {
          },
        },
      ]);
      this.setState({ showPinLock: false });
    }
  };

  render() {

    let { formData } = this.state;
    let { dashboard } = this.props;
    let { clientProfile, getEmployeeHistoryData, getEmployeeTrackerListData } = dashboard;


    return (
      <SafeAreaView>
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000',}}>
          <View style={{ flex: 1,  }} >

            {this.state.showPinLock == true ?
              <View style={{ flex: 1, position: 'absolute', height: '100%', width: '100%', backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
                <PINCode
                  status={this.state.PINCodeStatus}
                  touchIDDisabled={true}
                  finishProcess={() => this._finishProcess()}
                />
              </View>
              :
              <>
                <View style={{
                  marginBottom: 16
                }}>

                  <View style={{ marginHorizontal: 18, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={() => this.props.navigation.goBack()}>
                      <Image style={{
                        width: 30,
                        height: 30,
                        marginTop: 15
                      }} source={require('../../Statics/img/Profile/back-arrow.png')} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 15, textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Security</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: 15 }}>
                  <View style={{ backgroundColor: '#FFF', width: width - 35, borderRadius: 18, elevation: 8, borderWidth: 1, borderColor: '#FFF' }}>
                    <View style={{ borderRadius: 17, borderWidth: 1, borderColor: '#FFF' }}>

                      <Text style={{ fontSize: 15, color: 'gray', paddingLeft: 17, paddingTop: 20 }}>Current Password</Text>
                      <View style={{ marginHorizontal: 15, height: 45, backgroundColor: '#E4E7F2', borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Current Password"
                          fontSize={14}
                          name="currentpassword"
                          secureTextEntry={true}
                          value={formData.currentpassword}
                          onChangeText={(text) => this.handleInput(text, "currentpassword")}
                        />
                      </View>

                      <Text style={{ fontSize: 15, color: 'gray', paddingLeft: 17, paddingTop: 15 }}>New Password</Text>
                      <View style={{ marginHorizontal: 15, height: 45, backgroundColor: '#E4E7F2', borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="New Password"
                          fontSize={14}
                          name="newpassword"
                          secureTextEntry={true}
                          value={formData.newpassword}
                          onChangeText={(text) => this.handleInput(text, "newpassword")}
                        />
                      </View>

                      <Text style={{ fontSize: 15, color: 'gray', paddingLeft: 17, paddingTop: 15 }}>Confirm Password</Text>
                      <View style={{ marginHorizontal: 15, height: 45, backgroundColor: '#E4E7F2', borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Confirm Password"
                          fontSize={14}
                          name="confirmnewpassword"
                          secureTextEntry={true}
                          value={formData.confirmnewpassword}
                          onChangeText={(text) => this.handleInput(text, "confirmnewpassword")}
                        />
                      </View>

                      <View style={{ borderWidth: 1, borderColor: '#131313', borderRadius: 11, marginHorizontal: 20, marginBottom: 15, marginTop: 40, elevation: 8 }}>
                        <View
                          style={{ backgroundColor: '#0A142F', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#0A142F' }}>
                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this.updatePasswordSubmit()}>
                            <Text style={{
                              textAlign: 'center',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'
                            }}>Update</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Text style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 15,
                        textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'

                      }}>-----   OR   -----</Text>

                      <View style={{ borderWidth: 1, borderColor: '#131313', borderRadius: 11, marginHorizontal: 20, marginBottom: 20, marginTop: 20, elevation: 8 }}>
                        <View style={{ backgroundColor: '#0A142F', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#0A142F' }}>
                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this._showChoosePinLock()}>
                            <Text style={{ textAlign: 'center', color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Set PIN</Text>
                          </TouchableOpacity>
                        </View>
                      </View>


                      <TouchableOpacity onPress={() => this._clearPin()}>
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
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </>
            }
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
