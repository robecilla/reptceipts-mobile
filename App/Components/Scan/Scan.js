'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Vibration
} from 'react-native';
import Loader from '../Helpers/Loader';

import { SHOW_LOADER } from '../../Actions/UI';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../Actions/Receipt';

import BarcodeScanner from './BarcodeScanner';
import { RNCamera } from 'react-native-camera';

class Scan extends Component {

  onBarCodeRead = (e) => {
    Vibration.vibrate(300);
   // this.props.showLoader();
    const { navigate } = this.props.navigation;
    this.props.createReceipt(e.data, navigate);
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader
              loading={this.props.loading ? this.props.loading : false} />
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            onBarCodeRead={this.onBarCodeRead}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
    loading: state.ui.loading
  };
}

export default connect(mapStateToProps, actions)(Scan);