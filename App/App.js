import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import AppNav from './Navigation/AppNav.js';
import AuthNav from './Navigation/AuthNav.js';

class App extends Component {

  componentDidMount() {
    StatusBar.setHidden(true)
  }

  render() {
    let authenticated = false;

    if(authenticated) {
      return ( <AppNav /> )
    }

    return ( <AuthNav /> )
  }
}

export default App;