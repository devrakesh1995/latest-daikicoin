import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {
  View, Text, Dimensions, ImageBackground,
  Image, TouchableOpacity, BackHandler, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../stylescss/styles';

const { height, width } = Dimensions.get('window')


class initialSelectionscreen extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.state = {
    }
  }

  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    navigate('NewScreen');
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {

    return (
      <SafeAreaView>
        <View style={{ height: '100%', width: '100%', backgroundColor: '#000', }}>
          <ImageBackground source={require('../Statics/img/Welcome/backimg.png')} style={{ height: '100%', width: '100%' }}>

            <View style={{}} >
              <View style={styles.container}>
                <Text style={styles.daiki}>Daiki</Text>
                <Text style={styles.coin}>Coin </Text>
              </View>

              <View style={{ marginVertical: 40 }}>
                <View style={styles.imageview}>
                  <Image style={styles.logo} source={require('../Statics/img/Welcome/daikilogo.png')} />
                </View>

                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={styles.gradient}>
                  <View style={styles.button}>
                    <TouchableOpacity style={{ width: '100%' }}
                      onPress={() => this.gotoNextScreen('Login')}
                    >
                      <Text style={styles.buttontext}> LOGIN </Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>

                <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={styles.gradient1}>
                  <View style={styles.button}>
                    <TouchableOpacity style={{ width: '100%' }}
                      onPress={() => this.gotoNextScreen('Register')}
                    >
                      <Text style={styles.buttontext}> REGISTER </Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </ImageBackground>
        </View>
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
export default connect(mapStateToProps)(initialSelectionscreen);
