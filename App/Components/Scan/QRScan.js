import React, { Component } from "react";
import { StyleSheet, Text, View, Vibration, Alert } from "react-native";
import { Heading, Subtitle, Button, Text as ButtonText } from "@shoutem/ui";
import Loader from "../Helpers/Loader";

import { RNCamera } from "react-native-camera";

import { SCAN_SUCCESS } from "../../Actions/Receipt";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as receiptActions from "../../Actions/Receipt";
import * as userActions from "../../Actions/User";
import * as UIActions from "../../Actions/UI";

class QRScan extends Component {
  constructor(props) {
    super(props);
    this.state = { onBarCodeRead: this.onBarCodeRead };
    this.handleBarcode = this.handleBarcode.bind(this);
  }

  componentWillMount() {
    this.setState({ onBarCodeRead: this.onBarCodeRead });
  }

  componentWillUnmount() {
    this.setState({ onBarCodeRead: null });
  }

  onBarCodeRead = e => {
    this.componentWillUnmount();
    this.handleBarcode(e.data);
    setTimeout(() => {
      this.componentWillMount();
    }, 3000);
  };

  handleBarcode(qr) {
    Vibration.vibrate(200);
    this.props.receiptActions.createReceipt(
      qr,
      this.props.navigation,
      this.props.user.id,
      1
    );
  }

  render() {
    return (
      <View style={styles.camContainer}>
        {this.props.scanSucceed ? (
          Alert.alert(
            "Great!",
            "Receipt scanned successfully!",
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.dispatch({
                    type: SCAN_SUCCESS,
                    payload: false
                  });
                  this.props.navigation.replace("QRScan");
                }
              }
            ],
            { cancelable: false }
          )
        ) : (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            onBarCodeRead={this.state.onBarCodeRead}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={
              "We need your permission to use your camera"
            }
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  camContainer: {
    flex: 1,
    flexDirection: "column"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  ting: {
    flex: 1,
    alignItems: "center",
    width: 100
  }
});

function mapStateToProps(state) {
  return {
    user: state.user.user,
    scanSucceed: state.receipt.scanSucceed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    receiptActions: bindActionCreators(receiptActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScan);
