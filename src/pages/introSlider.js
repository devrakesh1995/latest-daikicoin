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

class introSlider extends Component {
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
        <View style={{ width: width, height: '100%', backgroundColor: '#000', }}>
          <ImageBackground source={require('../Statics/img/Welcome/backimg.png')} style={{ flex: 1 }}>

            <View style={{ marginTop: 10 }} >
              <View style={styles.container}>
                <Text style={styles.daiki}>Daiki</Text>
                <Text style={styles.coin}>Coin </Text>
              </View>

              <View style={{ marginVertical: 20 }}>
                <View style={styles.imageview}>
                  <Image style={styles.logo} source={require('../Statics/img/Welcome/daikilogo.png')} />
                </View>
              </View>

              <View style={{ marginTop: 40 }}>
                <View style={{ marginHorizontal: 20, }}>
                  <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 30 }}>Jump Start Your</Text>
                  <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 30 }}>Crypto Portfolio</Text>
                </View>
                <View style={{ marginHorizontal: 20, }}>
                  <Text style={{ color: '#FFF', fontSize: 15 }}>Take your investment portfolio</Text>
                  <Text style={{ color: '#FFF', fontSize: 15 }}>to next level</Text>
                </View>
              </View>
            </View>

            <View style={{ position: 'absolute', bottom: 35, right: 30, left: 30, }}>
              <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ width: '100%', borderRadius: 20, alignSelf: 'center', paddingVertical: 3, justifyContent: 'flex-end', flexDirection: 'column', }}>
                <View style={styles.button}>
                  <TouchableOpacity style={{ width: '100%' }}
                    onPress={() => this.gotoNextScreen('initialSelectionscreen')}
                  >
                    <Text style={styles.buttontext}> Get Started </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>

            {/* <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{ width: '85%', borderRadius: 20, alignSelf: 'center', paddingVertical: 3 }}>
              <View style={styles.button}>
                <TouchableOpacity style={{ width: '100%' }}
                  onPress={() => this.gotoNextScreen('initialSelectionscreen')}
                >
                  <Text style={styles.buttontext}> Get Started </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient> */}

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
export default connect(mapStateToProps)(introSlider);