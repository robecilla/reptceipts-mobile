'use strict';
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


class Scan extends Component {

  componentDidMount() {
    this.props.userActions.getUser();
  }

  onBarCodeRead = (e) => {
    Vibration.vibrate(300);
    const { navigate } = this.props.navigation;
    this.props.receiptActions.createReceipt(e.data, navigate, this.props.user.id);
  }

  render() {

    if (typeof this.props.user === 'undefined') {
      return (
        <View style={styles.view}>
          <Loader loading={true} />
        </View>
      )
    }

    return (
      <View style={styles.view}>
        <Heading styleName="md-gutter-top">Welcome {this.props.user.username}!</Heading>
        <Subtitle>point to receipt qr to get</Subtitle>

        <Loader
              loading={this.props.loading ? this.props.loading : false} />

        <View style={styles.camContainer}>
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

        <Button styleName="secondary h-center md-gutter-bottom" style={{width: '50%'}}>
            <ButtonText>NFC Scan</ButtonText>
        </Button>
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
    loading: state.ui.loading,
    user: state.user.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiptActions: bindActionCreators(receiptActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    UIActions: bindActionCreators(UIActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Scan);