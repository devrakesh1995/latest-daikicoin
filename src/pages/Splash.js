import React, { Component } from 'react';
import styles from '../stylescss/styles';
import {
  View, Text, ImageBackground, StatusBar,
  Image, Dimensions,
} from 'react-native';
const { height, width } = Dimensions.get('window')

export default class Splash extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {

    return (

      <ImageBackground source={require('../Statics/img/Splash/backimg.png')}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height, width: width }}
        imageStyle={{
          resizeMode: 'stretch'
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ height: 150, width: 150 }} source={require('../Statics/img/Wallet/coinlogo.png')} />
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Text style={styles.daiki}>Daiki</Text>
            <Text style={styles.coin}>Coin </Text>
          </View>
        </View>
        <StatusBar hidden={true} />
      </ImageBackground>
    )
  }
}
