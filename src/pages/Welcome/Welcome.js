import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   View, Text,TouchableOpacity, ImageBackground, TextInput, Button
} from 'react-native';

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    gotoSurveyScreen=()=>{
        this.props.navigation.navigate('FirstSurvey');
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../../Statics/img/Welcome/img-welcome.png')} style={{flex: 1 ,resizeMode:'contain'}}>
                    <View style={{
                        padding:30,
                        alignItems:'center'
                    }}>
                        <Text style={{
                            textAlign:'center',
                            color:'#000',
                            fontSize:35,
                            fontWeight:'bold',
                            padding:10
                        }}>
                            Hello
                        </Text>
                        <Text style={{
                            textAlign:'center',
                            fontSize:17
                        }}>
                            Welcome to HappyPlus! Let's understand what makes us happy and how to build a habit of happiness
                        </Text>
                    </View>
                    <View style={{
                        padding:30,
                        marginTop:300,
                        alignItems:'center'
                    }}>
                        <Text style={{
                            textAlign:'center',
                            fontSize:17,
                            color:'#fff'
                        }}>
                            As a first step let us explore where you in this happiness journey through a short survey.
                        </Text>
                        <TouchableOpacity onPress={() => this.gotoSurveyScreen()}> 
                            <View style={{
                                width:200,
                                height:50,
                                backgroundColor:'rgba(0, 153, 153,0.6)',
                                borderRadius:50,
                                marginTop:30,
                                borderWidth:1,
                                borderColor:'#f7f7f7'
                            }}>
                            <Text style={{
                                color:'#fff',
                                marginTop:12,
                                fontSize:15,
                                fontWeight:'bold',
                                textAlign:'center'
                            }}>LET'S START</Text></View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { dashboard } = state;
    return {
      loggingIn,
      dashboard
    };
  }
  export default connect(mapStateToProps)(Welcome);
  