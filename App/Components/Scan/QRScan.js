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
import * as UIActions from '../../Actions/UI';

class QRScan extends Component {

  componentDidMount() {
    if (typeof this.props.user === 'undefined') {
      this.props.userActions.getUser();
    }
  }

  onBarCodeRead = (e) => {
    this.props.navigation.goBack();
    Vibration.vibrate(200);
    const { navigate } = this.props.navigation;
    this.props.receiptActions.createReceipt(e.data, navigate, this.props.user.id);
  }

  render() {
    return (
      <View style={styles.camContainer}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            onBarCodeRead={this.onBarCodeRead}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera'}
        />
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
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    userActions: bindActionCreators(userActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(QRScan);