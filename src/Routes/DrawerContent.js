import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
export function DrawerContent(props) {
    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        width: '100%',
                    }}>
                    <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={['#8AD4EC', '#EF96FF', '#FF56A9', '#FFAA6C']} style={{
                        flexDirection: 'row',
                        height: 170,
                        marginTop: -4,
                        borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                    }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 27, borderBottomRightRadius: 27 }} >
                            <Image style={{ height: 100, width: 100 }} source={require('../Statics/img/Wallet/coinlogo.png')} />
                        </View>
                    </LinearGradient>

                    <View style={{ padding: 20, marginVertical: 10 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ContactUs')}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                marginBottom: 20, marginVertical: 5
                            }}
                            >
                                <View style={{
                                    width: '10%',
                                }}>
                                    <Image style={{
                                        width: 25,
                                        height: 25

                                    }} source={require('../Statics/img/Sidebar/telephon.png')} />
                                </View>
                                <View style={{
                                    width: '80%',
                                }}>
                                    <Text style={{
                                        color: '#FFF',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                    }}>Contact Us</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Transaction')}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 20,
                                alignItems: 'center'
                            }}
                            >
                                <View style={{
                                    width: '10%',
                                }}>
                                    <Image style={{

                                        width: 30,
                                        height: 30

                                    }} source={require('../Statics/img/Sidebar/transaction.png')} />

                                </View>
                                <View style={{
                                    width: '80%',

                                }}>
                                    <Text style={{
                                        color: '#FFF',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 2
                                    }}>Transactions</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 20,
                                alignItems: 'center'
                            }}
                            >
                                <View style={{
                                    width: '10%',
                                }}>
                                    <Image style={{
                                        width: 27,
                                        height: 27
                                    }} source={require('../Statics/img/Sidebar/lock.png')} />
                                </View>
                                <View style={{
                                    width: '80%',
                                }}>
                                    <Text style={{
                                        color: '#FFF',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 5
                                    }}>Security</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
                        marginTop: -20
                    }}
                        onPress={() => props.navigation.navigate('SelectionScreen')}>
                        <View style={{
                            height: 30,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                marginLeft: 20

                            }}>
                                <Image style={{
                                    width: 30,
                                    height: 30

                                }} source={require('../Statics/img/Sidebar/logout.png')} />

                            </View>
                            <View style={{
                                width: '50%'

                            }}>
                                <Text style={{
                                    color: '#FFF',
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    marginLeft: 15
                                }}>Logout</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </DrawerContentScrollView>
        </View>
    )
}
