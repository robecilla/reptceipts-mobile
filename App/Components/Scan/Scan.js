import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import BarcodeScanner from './BarcodeScanner';

export default class HomeScreen extends Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <BarcodeScanner />
        </View>
      );
    }
}