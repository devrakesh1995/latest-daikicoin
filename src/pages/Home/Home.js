import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
// import { alertActions } from '../../_actions';
import {
  View, Text, ScrollView,
  Image, TouchableOpacity, Linking, SafeAreaView, Dimensions, RefreshControl, ImageBackground
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
// import colors from '../../config/colors';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 'ALL',
      amount: '',
      refreshing: false,
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.setState({ data: 'ALL' })
    this.props.dispatch(dashboardActions.getClientProfile());

    setTimeout(() => {
      this.setState({ refreshing: false })

    }, 3000);
    // wait(1000).then(() => refreshing(false));
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users.sendCoinSuccess) {
      return {
        ...nextProps,
        // address: '',
        amount: '',
        // otp_code: '',

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

  async componentDidMount() {

    this.props.dispatch(dashboardActions.getClientProfile());
    this.props.dispatch(userActions.getTransactions());

    this.props.dispatch(userActions.navigationSave(this.props));
    const { navigation } = this.props;
  }

  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
  }


  render() {
    let { dashboard, users } = this.props;
    let { amount, } = this.state;
    let { clientProfile } = dashboard;
    let { transaction } = clientProfile ? clientProfile : {};
    let { getTxData, } = users;


    // console.log("ddddddddddddddddddddddddddddddddddd", getTxData);

    return (
      <SafeAreaView >
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000', }}>
          <View style={{}} >

            <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'gray', }}>
              <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style={{ width: 40, }}>
                <Image source={require('../../Statics/img/Wallet/menu.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, marginLeft: 10, color: '#FFF', fontWeight: 'bold' }}>DaikiCoin</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}

              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >

              <View style={{ backgroundColor: '#000', marginHorizontal: 15, }}>

                <View style={{ marginTop: 30 }}>
                  <ImageBackground source={require('../../Statics/img/Wallet/bac.png')} style={{ height: 180, width: '100%', }} imageStyle={{ borderRadius: 15 }}>
                    <View style={{ flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>
                      <Image style={{ width: 45, height: 45 }} source={require('../../Statics/img/Wallet/coinlogo.png')} />
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', }}>Current Balance</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 5, color: '#EF13B1', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>{clientProfile ? clientProfile.balance : 0}</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 5, marginTop: 15, color: '#EF13B1', }}>DIC</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 10, color: '#000', }}>Estimated total amount : </Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 10, color: '#C91212', }}>{clientProfile ? clientProfile.dollerbalance : 0} USD</Text>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 10, color: '#000', }}>Last Txid : </Text>
                        <Text style={{ fontSize: 14, fontWeight: 'normal', marginTop: 10, color: '#000', }}>
                          {getTxData && getTxData.lastTxData && getTxData.lastTxData.txId ?
                            <Text onPress={() => { Linking.openURL('https://explore.daikicoin.org/tx/' + getTxData.lastTxData.txId) }}
                              style={{
                                fontSize: 13, fontWeight: '500', color: '#000',
                              }}>
                              {getTxData && getTxData.lastTxData.txId ? getTxData.lastTxData.txId.substring(0, 17) + "..." : "XXX"}</Text>
                            : null}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>

                <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ borderRadius: 15, width: 150, padding: 5 }}>
                    <View style={{}}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Send')} style={{ width: '100%' }}>
                        <Text style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                          fontSize: 20,
                        }}>SEND</Text>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                  <View style={{ borderRadius: 15, width: 150, padding: 5, backgroundColor: '#6552FE' }}>
                    <View style={{}}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Receive')} style={{ width: '100%' }}>
                        <Text style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                          fontSize: 20,
                        }}>RECEIVE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 35 }}>
                  <Text style={{ fontSize: 20, color: '#FFF', fontWeight: 'bold', }}>Transactions </Text>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Transaction')} style={{ padding: 5 }}>
                    <Text style={{ fontSize: 14, color: '#FFF', fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: 'gray' }}>See All</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 5, marginBottom: 110 }}>
                  {transaction && transaction.length > 0 ? transaction.map((item, index) => (
                    <>
                      {
                        index <= 4 ?
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <View style={{ padding: 3, backgroundColor: '#9e9e9e', borderRadius: 5, justifyContent: 'center', }}>
                                <Image style={{ width: 40, height: 40 }} source={require('../../Statics/img/Wallet/coinlogo.png')} />
                              </View>
                              <View style={{ marginHorizontal: 15 }}>
                                <Text style={{ fontSize: 16, color: '#FFF', fontWeight: 'bold', }}>DaikiCoin</Text>
                                <Text style={{ fontSize: 10, color: '#FFF', }}>{moment(item.time * 1000).format('YYYY-MM-DD  HH:mm')}</Text>
                              </View>
                            </View>
                            <View style={{}}>
                              <Text style={{ fontSize: 19, color: item.category == 'send' ? '#C91212' : '#32CD32', fontWeight: 'bold', textAlign: 'right' }}>{item.amount}</Text>
                              <Text onPress={() => { Linking.openURL('https://explore.daikicoin.org/tx/' + item.txid) }} style={{ fontSize: 13, color: '#FFF', borderBottomWidth: 1, borderBottomColor: 'gray' }}>{item && item.txid ? item.txid.substring(0, 10) + ".." : "XXX"}</Text>
                            </View>
                          </View>
                          : null
                      }
                    </>)) : null
                  }
                </View>
              </View>
            </ScrollView>
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

export default connect(mapStateToProps)(Home);
