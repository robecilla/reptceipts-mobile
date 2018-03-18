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
    //StatusBar.setHidden(true);
    StatusBar.setBackgroundColor('transparent', true);
    StatusBar.setBarStyle('dark-content', true);
  }

  render() {
    return this.props.authenticated ? <AppNav /> : <AuthNav />  
  }
  
}

function mapStateToProps(state) {
  return {
    authenticated : state.auth.authenticated
  };
}

export default connect(mapStateToProps)(App);
