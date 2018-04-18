import React, { Component } from "react";
import { StyleSheet, Text, View, Vibration, Alert } from "react-native";
import { Heading, Subtitle, Button, Text as ButtonText } from "@shoutem/ui";
import Loader from "../Helpers/Loader";

import { RNCamera } from "react-native-camera";
import { withNavigationFocus } from "@patwoz/react-navigation-is-focused-hoc";

import { SHOW_LOADER, TOGGLE_CAMERA } from "../../Actions/UI";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as receiptActions from "../../Actions/Receipt";
import * as userActions from "../../Actions/User";
import * as UIActions from "../../Actions/UI";

class ScanResult extends Component {
  render() {
    const { params } = this.props.navigation.state;
    console.log();
    return (
      <View>
        {params.success
          ? Alert.alert(
              "Great!",
              "Receipt scanned successfully! Swipe left",
              [
                {
                  text: "OK",
                  onPress: () => this.props.navigation.replace("Receipts")
                }
              ],
              { cancelable: false }
            )
          : false}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    scanSucceed: state.receipt.scanSucceed
  };
}

export default connect(mapStateToProps, null)(ScanResult);
