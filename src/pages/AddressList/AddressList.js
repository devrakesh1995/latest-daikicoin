import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  View, Text,
  Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Dimensions
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../stylescss/styles';

const { width, height } = Dimensions.get('window');

class AddressList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      amount: '',
      erramount: '',
      name: '',
      isShowModal: false,
      isShowSendModal: false,
      errorslogin: {},
      formData: {
        "name": "",
        "address": ""
      }
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.users.sendCoinSuccess) {
      return {
        ...nextProps,
        address: '',
        amount: '',
        otp_code: '',
        isShowSendModal: false,
        name: '',
      }
    }
    if (nextProps.dashboard.addedSuccessfully) {
      return {
        ...nextProps,
        isShowModal: false,
        formData: {
          "name": "",
          "address": ""
        }
      }
    } else {
      return {
        ...nextProps
      }
    }
  }

  async componentDidMount() {
    this.props.dispatch(dashboardActions.getAddress());

  }


  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

  handleInput = (text, name) => {
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }

  copyClipBoard = (text) => {
    Clipboard.setString(text);
    this.props.dispatch(alertActions.success("Copied successfully!"));
  }

  submitAddressDetails = () => {
    if (this.handleValidationCreate()) {
      let { formData } = this.state;
      this.props.dispatch(dashboardActions.addAddress(formData));
    }
  }

  handleValidationCreate = () => {
    let { formData } = this.state;
    let errorslogin = {};
    let formIsValid = true;

    //Full Name
    if (formData.name == '') {
      formIsValid = false;
      errorslogin["name"] = "Please enter full name!";
    }
    //Enter address
    if (formData.address == '') {
      formIsValid = false;
      errorslogin["address"] = "Please enter address!";
    }

    this.setState({ errorslogin: errorslogin });
    return formIsValid;
  }

  toggleModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }

  toggleSendModel = (data) => {
    if (data) {
      this.setState({
        isShowSendModal: !this.state.isShowSendModal,
        address: data.address,
        amount: '',
        name: data.name,
      })
    } else {
      this.setState({
        isShowSendModal: !this.state.isShowSendModal,
        address: '',
        amount: '',
        name: '',
      })
    }

  }

  handleLoginInput = (name, text) => {
    this.setState({ [name]: text })
  }

  sendFromWithOTP = (e) => {
    // if (this.handleValidationOtp()) {
      let { address, amount, otp } = this.state;
      this.props.dispatch(userActions.sendFromWithOTP({ address, amount, otp, comment: "Send" }, this));
      this.setState({ temp: "asdf" })
    // }
  }

  handleValidationOtp = () => {
    let otp = this.state.otp;
    let { formData } = this.state;
    let errorslogin = {};
    let formIsValid = true;

    //Enter OTP
    if (!otp == '') {
      formIsValid = false;
      errorslogin["otp"] = "Please enter otp!";
    }

    this.setState({ errorslogin: errorslogin });
    return formIsValid;
  }


  sendFrom = (e) => {
    if (this.handleSendform()) {
      let { address, amount } = this.state;
      this.props.dispatch(userActions.sendOtpTX({ address, amount, comment: "Send" }, this));
      this.setState({ temp: "asdf" })
    }
  }

  handleSendform = () => {
    let formIsValid = true;

    if (this.state.amount == "") {
      this.setState({ erramount: "Plaese Enter Amount" });
      formIsValid = false;

    }
    return formIsValid;

  }

  // handleValidationSend = () => {
  //   let { formData } = this.state;
  //   let errorslogin = {};
  //   let formIsValid = true;

  //   //Enter address
  //   if (formData.address == '') {
  //     formIsValid = false;
  //     errorslogin["address"] = "Please enter address!";
  //   }
  //   //Enter Amount
  //   if (formData.amount == '') {
  //     formIsValid = false;
  //     errorslogin["amount"] = "Please enter amount!";
  //   }

  //   this.setState({ errorslogin: errorslogin });
  //   return formIsValid;
  // }


  render() {
    let { dashboard, users } = this.props;
    let { addressList } = dashboard;
    let formData = {}
    let { address, amount, errorslogin } = this.state;
    // console.log("assssssssss", amount);


    return (
      <SafeAreaView >
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000', }}>
          <View style={{ flex: 1, }} >

            <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'gray', justifyContent: 'space-between' }}>
              <View style={{}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 40, }}>
                  <Image source={require('../../Statics/img/Wallet/back.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#FFF', justifyContent: 'center', fontWeight: 'bold', }}>CONTACT</Text>
              </View>

              <TouchableOpacity onPress={this.toggleModal}
                style={{ height: 26, width: 26, alignItems: 'center', justifyContent: 'center', elevation: 8, backgroundColor: '#6552FE', borderRadius: 12, }}>
                <Text style={{ fontSize: 18, marginTop: -2, color: '#FFF', }}>+</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ width: '100%', height: '100%', top: 10, marginBottom: 75 }}>

              {
                addressList && addressList.length ? addressList.map((element) => (
                  <View style={{ marginHorizontal: 10, backgroundColor: '#18222C', borderRadius: 10, paddingHorizontal: 10, marginTop: 8, padding: 15, marginBottom: 15 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFF', }}>{element.name}</Text>
                      </View>
                      <View style={{}}>
                        <TouchableOpacity onPress={() => this.toggleSendModel(element)}>
                          <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ width: 70, height: 25, justifyContent: 'center', borderRadius: 5 }}>
                            <Text style={{
                              textAlign: 'center',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: 15,
                            }}>Send</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF' }}> Address: </Text>
                        <Text style={{ fontSize: 13, width: '55%', color: '#FFF', }}>{element.address}</Text>
                      </View>
                      <View style={{}}>
                        <TouchableOpacity onPress={() => this.copyClipBoard(element ? element.address : "NA")}>
                          <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#6552FE', '#6552FE', '#6552FE', '#6552FE']} style={{ width: 70, height: 25, justifyContent: 'center', borderRadius: 5, alignSelf: 'center' }}>
                            <Text style={{
                              textAlign: 'center',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: 15,
                            }}>Copy</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  // <View style={{ marginHorizontal: 8, }} key={element.id}>
                  //   <View style={{ backgroundColor: '#18222C', marginTop: 15, borderRadius: 10, padding: 5, }}>
                  //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginHorizontal: 10 }}>
                  //       <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FFF' }}>{element.name}</Text>
                  //       <TouchableOpacity onPress={() => this.toggleSendModel(element)}>
                  //         <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ width: 70, height: 25, justifyContent: 'center', borderRadius: 5 }}>
                  //           <Text style={{
                  //             textAlign: 'center',
                  //             color: '#fff',
                  //             fontWeight: 'bold',
                  //             fontSize: 15,
                  //           }}>Send</Text>
                  //         </LinearGradient>
                  //       </TouchableOpacity>
                  //     </View>
                  //     <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', marginHorizontal: 10, marginBottom: 12, justifyContent: 'space-between' }}>
                  //       <View style={{ flexDirection: 'row', }}>
                  //         <Text style={{ fontSize: 14, fontWeight: '500', color: '#FFF' }}> Address: </Text>
                  //         <Text style={{ fontSize: 13, width: '55%', color: '#FFF', }}>{element.address}</Text>
                  //       </View>
                  //       <TouchableOpacity onPress={() => this.copyClipBoard(element ? element.address : "NA")}>
                  //         <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#6552FE', '#6552FE', '#6552FE', '#6552FE']} style={{ width: 70, height: 25, justifyContent: 'center', borderRadius: 5, alignSelf: 'center' }}>
                  //           <Text style={{
                  //             textAlign: 'center',
                  //             color: '#fff',
                  //             fontWeight: 'bold',
                  //             fontSize: 15,
                  //           }}>Copy</Text>
                  //         </LinearGradient>
                  //       </TouchableOpacity>
                  //     </View>
                  //   </View>
                  // </View>
                ))
                  : null
              }
            </ScrollView>
          </View >
        </View >

        <Modal isVisible={this.state.isShowModal}>
          {/* <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{  }}> */}
          <View style={{ backgroundColor: '#000', borderWidth: 2, borderColor: 'gray', borderRadius: 15 }}>
            <Text style={styles.textemail}>Full Name</Text>
            <View style={styles.TextInput}>
              <TextInput
                style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                placeholder="Enter Full Name"
                placeholderTextColor='lightgray'
                fontSize={15}
                name="name"
                value={formData.name}
                onChangeText={(text) => this.handleInput(text, "name")}
              />
            </View>
            {errorslogin && errorslogin["name"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["name"]}</Text> : null}

            <Text style={styles.textemail}>Address</Text>
            <View style={styles.TextInput}>
              <TextInput
                style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                placeholder="Enter Address"
                placeholderTextColor='lightgray'
                fontSize={15}
                name="address"
                value={formData.address}
                onChangeText={(text) => this.handleInput(text, "address")}
              />
            </View>
            {errorslogin && errorslogin["address"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["address"]}</Text> : null}

            <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 40, justifyContent: 'space-between', marginHorizontal: 20 }}>
              <View style={{ borderRadius: 18, width: 125, padding: 5, backgroundColor: '#6552FE' }}>
                <TouchableOpacity onPress={this.toggleModal} style={{ width: '100%' }}
                >
                  <Text style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    fontSize: 20,
                  }}>CANCEL</Text>
                </TouchableOpacity>
              </View>
              <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ borderRadius: 18, width: 125, padding: 5 }}>
                <View style={{}}>
                  <TouchableOpacity onPress={() => this.submitAddressDetails()} style={{ width: '100%' }}
                  >
                    <Text style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      fontSize: 20,
                    }}>CREATE</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
          {/* </LinearGradient> */}
        </Modal>

        <Modal isVisible={this.state.isShowSendModal}>
          <View style={{ backgroundColor: '#000', borderWidth: 2, borderColor: 'gray', borderRadius: 15 }}>
            {
              users && !users.sendCoinTXOTPSuccess ?
                <>
                  <View style={{ width: '100%', }}>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', }}>
                      <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFF', marginLeft: 20 }}>
                        To {this.state.name ? `(${this.state.name})` : ''}</Text>
                    </View>
                    <Text style={styles.textemail}>Address</Text>
                    <View style={styles.TextInput}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                        placeholder="Enter Address"
                        placeholderTextColor='lightgray'
                        fontSize={15}
                        name="address"
                        selectTextOnFocus={true}
                        onChangeText={(text) => this.handleLoginInput("address", text)}
                        value={address}
                      />
                    </View>
                    {/* {errorslogin && errorslogin["address"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["address"]}</Text> : null} */}

                    <Text style={styles.textemail}>Amount</Text>
                    <View style={styles.TextInput}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                        placeholder="Enter Amount"
                        placeholderTextColor='lightgray'
                        fontSize={15}
                        keyboardType={'numeric'}
                        name="amount"
                        onChangeText={(text) => this.handleLoginInput("amount", text)}
                        value={amount}
                      />
                    </View>
                    {/* {this.state.erramount?<Text style={{color: 'red', marginHorizontal: 15,}}>{this.state.erramount}</Text>:null} */}

                    <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 40, justifyContent: 'space-between', marginHorizontal: 20 }}>
                      <View style={{ borderRadius: 18, width: 125, padding: 5, backgroundColor: '#6552FE' }}>
                        <TouchableOpacity onPress={this.toggleSendModel} style={{ width: '100%' }}
                        >
                          <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            fontSize: 20,
                          }}>CANCEL</Text>
                        </TouchableOpacity>
                      </View>
                      <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ borderRadius: 18, width: 125, padding: 5 }}>
                        <View style={{}}>
                          <TouchableOpacity onPress={() => this.sendFrom()} style={{ width: '100%' }}
                          >
                            <Text style={{
                              color: '#fff',
                              fontWeight: 'bold',
                              alignSelf: 'center',
                              fontSize: 20,
                            }}>SEND</Text>
                          </TouchableOpacity>
                        </View>
                      </LinearGradient>
                    </View>
                  </View>
                </>
                :
                <>
                  <View style={{}}>
                    <Text style={{ padding: 19, fontSize: 22, fontWeight: 'bold', color: '#FFF' }}>Send Coin Verification</Text>
                    <Text style={styles.textemail}>Enter OTP</Text>
                    <View style={styles.TextInput}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                        name="otp"
                        placeholder="Enter OTP"
                        placeholderTextColor='lightgray'
                        fontSize={15}
                        keyboardType={'numeric'}
                        onChangeText={(text) => this.handleLoginInput("otp", text)}
                        value={this.state.otp}
                      />
                    </View>
                    {errorslogin && errorslogin["otp"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["otp"]}</Text> : null}

                    <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ marginHorizontal: 15, marginTop: 40, borderRadius: 15, marginBottom: 30 }}>
                      <View style={{ height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity style={{ width: '100%' }}
                          onPress={() => this.sendFromWithOTP()}>
                          <Text style={
                            styles.buttontext
                          }>VERIFY AND PROCEED</Text>
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </View>
                </>
            }
          </View>
        </Modal>
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
export default connect(mapStateToProps)(AddressList);
