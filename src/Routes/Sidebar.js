import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContactUs from '../pages/ContactUs/ContactUs';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import initialSelectionscreen from '../pages/initialSelectionscreen';
import BottomTab from './BottomTab';
import { DrawerContent } from './DrawerContent';
import { dashboardActions } from '../_actions';
import Transaction from '../pages/Transaction/Transaction';

const Drawer = createDrawerNavigator();

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      isLoading: true
    }
  }


  componentDidMount() {
    this.props.dispatch(dashboardActions.getClientProfile());
  }

  render() {
    let { dashboard } = this.props;
    let { clientProfile } = dashboard;
    let profileData = '';
    if (clientProfile && clientProfile.profile) {
      profileData = clientProfile.profile;

    }

    return (
      <Drawer.Navigator headerMode='none' initialRouteName='BottomTab'
        drawerContent={props => <DrawerContent {...props} profileData={profileData} />}>
        <Drawer.Screen name="BottomTab" component={BottomTab} />
        <Drawer.Screen name="ContactUs" component={ContactUs} options={{ drawerLabel: 'ContactUs' }} />
        <Drawer.Screen name="Transaction" component={Transaction} options={{ drawerLabel: 'Transaction' }} />
        <Drawer.Screen name="Profile" component={Profile} options={{ drawerLabel: 'Profile' }} />
        <Drawer.Screen name="Login" component={Login} options={{ drawerLabel: 'Login' }} />
        <Drawer.Screen name="SelectionScreen" component={initialSelectionscreen} options={{ drawerLabel: 'SelectionScreen' }} />
      </Drawer.Navigator>
    );
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
export default connect(mapStateToProps)(Sidebar);
