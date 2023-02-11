import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
// import { dashboardActions, } from '../../_actions';
// import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  View, Text, SafeAreaView, ImageBackground,
  Image, TouchableOpacity, Dimensions
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
// import colors from '../../config/colors';
import QRCode from 'react-native-qrcode-generator'
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
class ReceiveCoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      amount: '',
      // showQRScanner: false
    }
  }


  async componentDidMount() {
    // this.props.dispatch(dashboardActions.getClientProfile());
  }

  copyClipBoard = (text) => {
    Clipboard.setString(text);
    this.props.dispatch(alertActions.success("Copied successfully!"));

  }

  render() {
    let { dashboard } = this.props;
    let { address, amount } = this.state;
    let { clientProfile } = dashboard;
    let { transaction } = clientProfile ? clientProfile : {};


    // console.log('clientProfiledddddddddddddddddddddddddd', clientProfile);

    return (
      <SafeAreaView >
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000', }}>

          <View style={{ flex: 1, }} >

            <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'gray', }}>
              <View style={{ width: '40%', }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 40, }}>
                  <Image source={require('../../Statics/img/Wallet/back.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#FFF', justifyContent: 'center', fontWeight: 'bold', }}>RECEIVE</Text>
              </View>
            </View>

            <View style={{ marginHorizontal: 15, justifyContent: 'center', position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", }}>
              <ImageBackground source={require('../../Statics/img/Wallet/bac.png')} style={{ width: '100%', }} imageStyle={{ borderRadius: 15 }}>
                < View style={{ borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: '100%', }}>
                    <Text style={{ fontSize: 16, textAlign: 'left' }}>Address QR Code</Text>
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <QRCode
                      value={clientProfile ? clientProfile.address : "NA"}
                      size={170}
                      bgColor='#000'
                      fgColor='#FFF' />
                  </View>
                  <Text numberOfLines={1}
                    style={{
                      marginTop: 20,
                      fontSize: scaleRatio(2.1),
                      fontWeight: '600',
                      width: '80%',
                      textAlign: 'center',
                      color: '#6552FE'
                    }}>{clientProfile ? clientProfile.address : "NA"}</Text>

                  <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ marginHorizontal: 20, marginBottom: 30, marginTop: 30, elevation: 8, width: width - 80, borderRadius: 20 }}>
                    <View style={{ height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                      <TouchableOpacity style={{ width: '100%' }}
                        onPress={() => this.copyClipBoard(clientProfile ? clientProfile.address : "NA")}>
                        <Text style={{
                          textAlign: 'center',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 20,
                        }}>COPY</Text>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </View>
              </ImageBackground>
            </View>
          </View>
        </View >
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
export default connect(mapStateToProps)(ReceiveCoin);
