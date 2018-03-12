import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import { connect } from 'react-redux';

import AppNav from './Navigation/AppNav.js';
import AuthNav from './Navigation/AuthNav.js';

class App extends Component {

  componentDidMount() {
    //StatusBar.setHidden(true)
  }

  render() {
    let authenticated = this.props.authenticated;

    if(authenticated) {
      return ( <AppNav /> )
    }

    return ( <AuthNav /> )
  }
}

function mapStateToProps(state) {
  return {
    authenticated : state.auth.authenticated
  };
}

export default connect(mapStateToProps)(App);
