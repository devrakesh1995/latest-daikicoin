import React, { Component } from 'react';
import moment from 'moment';
// import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import {
  View, Text, ScrollView,
  Image, TouchableOpacity, FlatList, Linking, SafeAreaView, Dimensions,
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
const { width, height } = Dimensions.get('window');
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      // tran: null
    }
  }

  // onRefresh = () => {
  //   this.setState({ refreshing: true })
  //   this.props.dispatch(dashboardActions.getClientProfile());

  //   setTimeout(() => {
  //     this.setState({ refreshing: false })

  //   }, 3000);
  //   // wait(1000).then(() => refreshing(false));
  // };

  async componentDidMount() {

    this.props.dispatch(dashboardActions.getClientProfile());
    this.props.dispatch(userActions.getTransactions());
  }

  render() {
    let { dashboard, users } = this.props;
    let { clientProfile } = dashboard;
    let { transaction } = clientProfile ? clientProfile : {};
    let { getTxData } = users;

    // console.log("ddddddddddddddddddddddddddddddddddd", getTxData);

    return (
      <SafeAreaView >
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000', }}>
          <View style={{}} >

            <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'gray', }}>
              <View style={{ width: '30%', }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 40, }}>
                  <Image source={require('../../Statics/img/Wallet/back.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#FFF', justifyContent: 'center', fontWeight: 'bold', }}>TRANSACTION</Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}
              contentContainerStyle={{
              }}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this.onRefresh}
            //   />
            // }
            >

              <View style={{ backgroundColor: '#000', marginHorizontal: 15, marginBottom: 70, marginVertical: 20 }}>
                <FlatList
                  data={transaction}
                  keyExtractor={(transaction) => transaction.txid.toString()}
                  numColumns={1}
                  renderItem={({ item, index }) => (
                    <>
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
                          <Text onPress={() => { Linking.openURL('https://explore.daikicoin.org/tx/' + item.txid) }} style={{ fontSize: 13, color: '#FFF', }}>{item && item.txid ? item.txid.substring(0, 10) + "..." : "XXX"}</Text>
                        </View>
                      </View>
                    </>
                  )}
                />
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
export default connect(mapStateToProps)(Transaction);
