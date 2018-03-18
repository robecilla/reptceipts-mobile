import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Vibration
} from 'react-native';
import { Heading, Subtitle, Button, Text as ButtonText } from '@shoutem/ui';
import Loader from '../Helpers/Loader';

import { RNCamera } from 'react-native-camera';

import { SHOW_LOADER } from '../../Actions/UI';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as receiptActions from '../../Actions/Receipt';
import * as userActions from '../../Actions/User';

class NFCScan extends Component {

  componentDidMount() {
    if (typeof this.props.user === 'undefined') {
        this.props.userActions.getUser();
    }
  }

  onBarCodeRead = (e) => {
    Vibration.vibrate(300);
    const { navigate } = this.props.navigation;
    this.props.receiptActions.createReceipt(e.data, navigate, this.props.user.id);
  }

  render() {
    return (
      <View style={styles.view}>
        { /* NFC component goes here */ }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',

  },
  camContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    height: 425,
    width: 350
  }
});

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiptActions: bindActionCreators(receiptActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NFCScan);