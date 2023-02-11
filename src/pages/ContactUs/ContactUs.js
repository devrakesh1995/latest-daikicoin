import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { dashboardActions } from '../../_actions';
import {
  View, Text, Dimensions,
  TouchableOpacity, TextInput, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { height, width } = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../stylescss/styles';

class ContactUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      errorslogin: {},
      formData:
      {
        "name": "",
        "mobile": "",
        "email": "",
        "message": ""
      }
    }
  }

  componentDidMount() {

  }

  static getDerivedStateFromProps(nextProps) {

    if (nextProps.dashboard.submitEnquirySuccess) {
      return {
        ...nextProps,
        formData: {
          "name": "",
          "mobile": "",
          "email": "",
          "message": ""
        }
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

  handleInput = (text, name) => {
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }

  submitContactDetails = () => {
    if (this.handleValidationContact()) {
      let { formData } = this.state
      this.props.dispatch(dashboardActions.saveEnqiry(formData, this.props));
    }

  }

  handleValidationContact = () => {
    let { formData } = this.state;
    let errorslogin = {};
    let formIsValid = true;

    //Full Name
    if (formData.name == '') {
      formIsValid = false;
      errorslogin["name"] = "Please enter full name!";
    }
    //Email address
    if (formData.email == '') {
      formIsValid = false;
      errorslogin["email"] = "Please enter email address!";
    }
    //Mobile no
    if (formData.mobile == '') {
      formIsValid = false;
      errorslogin["mobile"] = "Please enter mobile number!";
    }
    //message
    if (formData.message == '') {
      formIsValid = false;
      errorslogin["message"] = "Please enter message!";
    }

    this.setState({ errorslogin: errorslogin });
    return formIsValid;
  }



  gotoIntroScreen = () => {
    this.props.navigation.navigate('Intro1')
  }

  render() {
    let { formData, errorslogin } = this.state;
    let { dashboard } = this.props;
    let { clientProfile, getEmployeeHistoryData, getEmployeeTrackerListData } = dashboard;
    // console.log("form data ::::::", formData);


    return (
      <SafeAreaView>
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000', }}>
          <View style={{ flex: 1, }} >
            <>
              <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'gray', }}>
                <View style={{ width: '30%', }}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 40, }}>
                    <Image source={require('../../Statics/img/Wallet/back.png')} style={{ height: 25, width: 25 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, color: '#FFF', justifyContent: 'center', fontWeight: 'bold', }}>CONTACT US</Text>
                </View>
              </View>

              <View style={{ marginVertical: 20 }}>
                <Text style={styles.textemail}>Full Name</Text>
                <View style={styles.TextInput}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                    placeholder="Enter Name"
                    placeholderTextColor='lightgray'
                    fontSize={15}
                    name="name"
                    value={formData.name}
                    onChangeText={(text) => this.handleInput(text, "name")}
                  />
                </View>
                {errorslogin && errorslogin["name"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["name"]}</Text> : null}

                <Text style={styles.textemail}>Email Address</Text>
                <View style={styles.TextInput}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                    placeholder="Enter Email Address"
                    placeholderTextColor='lightgray'
                    fontSize={15}
                    name="email"
                    value={formData.email}
                    onChangeText={(text) => this.handleInput(text, "email")}
                  />
                </View>
                {errorslogin && errorslogin["email"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["email"]}</Text> : null}

                <Text style={styles.textemail}>Mobile Number</Text>
                <View style={styles.TextInput}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                    placeholder="Enter Mobile Number"
                    placeholderTextColor='lightgray'
                    fontSize={15}
                    keyboardType='numeric'
                    name="mobile"
                    value={formData.mobile}
                    onChangeText={(text) => this.handleInput(text, "mobile")}
                  />
                </View>
                {errorslogin && errorslogin["mobile"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["mobile"]}</Text> : null}

                <Text style={styles.textemail}>Message</Text>
                <View style={styles.TextInput}>
                  <TextInput
                    style={{ marginHorizontal: 10, fontSize: 15, color: 'lightgray' }}
                    placeholder="Enter Message"
                    placeholderTextColor='lightgray'
                    fontSize={15}
                    name="message"
                    value={formData.message}
                    onChangeText={(text) => this.handleInput(text, "message")}
                  />
                </View>
                {errorslogin && errorslogin["message"] ? <Text style={{ color: 'red', marginHorizontal: 15, }}>{errorslogin["message"]}</Text> : null}

                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ marginHorizontal: 20, marginTop: 45, elevation: 8, width: width - 42, borderRadius: 20 }}>
                  <View style={{ height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <TouchableOpacity style={{ width: '100%' }}
                      onPress={() => this.submitContactDetails()}>
                      <Text style={
                        styles.buttontext
                      }>SUBMIT</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </>
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
export default connect(mapStateToProps)(ContactUs);
