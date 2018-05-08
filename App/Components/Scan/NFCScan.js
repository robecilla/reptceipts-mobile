import React, { Component } from "react";
import axios from "axios";
import sStorage from "../../Actions/Storage";
import {
  StyleSheet,
  View,
  Vibration,
  TouchableOpacity,
  Alert
} from "react-native";

import { Heading, Subtitle, Button, Text } from "@shoutem/ui";
import Loader from "../Helpers/Loader";
import { SCAN_SUCCESS } from "../../Actions/Receipt";

import NfcManager, { NdefParser } from "react-native-nfc-manager";
import { withNavigationFocus } from "@patwoz/react-navigation-is-focused-hoc";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as receiptActions from "../../Actions/Receipt";
import * as userActions from "../../Actions/User";

import { ROOT_URL } from "../../Actions/config";

class NFCScan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: false,
      enabled: false,
      tag: {}
    };
    this.simulated = this.simulated.bind(this);
  }

  /* Used to get isFocused from props */
  componentWillReceiveProps(nextProps) {}

  componentDidMount() {
    this.props.isFocused
      ? NfcManager.isSupported().then(supported => {
          this.setState({ supported });
          if (supported) {
            this.startNfc();
          }
        })
      : false;
  }

  componentWillUnmount() {
    if (this._stateChangedSubscription) {
      this._stateChangedSubscription.remove();
    }
  }

  startNfc() {
    NfcManager.start({
      onSessionClosedIOS: () => {}
    })
      .then(result => {
        console.log("start OK", result);
        this.startDetection();
      })
      .catch(error => {
        console.warn("start fail", error);
        this.setState({ supported: false });
      });

    NfcManager.isEnabled()
      .then(enabled => {
        this.setState({ enabled });
      })
      .catch(err => {
        console.log(err);
      });

    NfcManager.onStateChanged(event => {
      if (event.state === "on") {
        this.setState({ enabled: true });
      } else if (event.state === "off") {
        this.setState({ enabled: false });
      } else if (event.state === "turning_on") {
        // do whatever you want
      } else if (event.state === "turning_off") {
        // do whatever you want
      }
    })
      .then(sub => {
        this._stateChangedSubscription = sub;
        // remember to call this._stateChangedSubscription.remove()
        // when you don't want to listen to this anymore
      })
      .catch(err => {
        console.warn(err);
      });
  }

  startDetection = () => {
    NfcManager.registerTagEvent(this.onTagDiscovered)
      .then(result => {
        console.log("Ready to go, display some icon or something");
      })
      .catch(error => {
        console.warn("registerTagEvent fail", error);
      });
  };

  onTagDiscovered = tag => {
    /* Parse tag information */
    let receipt = this.parseText(tag);
    console.log(receipt);
    /* If parsed successfully, get url content which is the receipt data in JSON format and create receipt */
    if (receipt) {
      const { receiptActions } = this.props;
      const user_id = this.props.user.id;

      Vibration.vibrate(200);
      receiptActions.createReceipt(receipt, this.props.navigation, user_id, 2);
    }
  };

  simulated() {
    const { receiptActions } = this.props;
    const user_id = this.props.user.id;

    sStorage.getItem("token").then(token => {
      axios
        .get(`${ROOT_URL}/api/receipt/getNFC/1`, {
          headers: new Headers({
            Authorization: "Bearer" + token
          })
        })
        .then(response => {
          let receipt = response.data.response;
          Vibration.vibrate(300);
          receiptActions.createReceipt(
            receipt,
            this.props.navigation,
            user_id,
            2
          );
        })
        .catch(error => console.error("Error:", error));
    });
  }

  // parseUri = tag => {
  //   if (tag.ndefMessage) {
  //     let result = NdefParser.parseUri(tag.ndefMessage[0]),
  //       uri = result && result.uri;
  //     if (uri) {
  //       console.log("parseUri: " + uri);
  //       return uri;
  //     }
  //   }
  //   return null;
  // };

  parseText = tag => {
    if (tag.ndefMessage) {
      return NdefParser.parseText(tag.ndefMessage[0]);
    }
    return null;
  };

  goToNFCSetting() {
    NfcManager.goToNfcSetting()
      .then(result => {
        console.log("goToNfcSetting OK", result);
      })
      .catch(error => {
        console.warn("goToNfcSetting fail", error);
      });
  }

  render() {
    return (
      <View style={styles.view}>
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
                  this.props.navigation.replace("NFCScan");
                }
              }
            ],
            { cancelable: false }
          )
        ) : this.state.supported ? (
          this.state.enabled ? (
            <View style={styles.view}>
              <Subtitle styleName="md-gutter">
                Hover over the device to get the receipt
              </Subtitle>
            </View>
          ) : (
            <View style={styles.view}>
              <Subtitle styleName="md-gutter">
                Seems like you need to enable NFC in your phone
              </Subtitle>
              <Button
                onPress={this.goToNFCSetting}
                styleName="secondary xl-gutter-top"
              >
                <Text>ENABLE IT</Text>
              </Button>
            </View>
          )
        ) : (
          <View style={styles.view}>
            <Subtitle styleName="xl-gutter">
              Oh no!, seems like your device does not support NFC!
            </Subtitle>
            <Button
              onPress={this.simulated}
              styleName="secondary xl-gutter-top"
            >
              <Text>SIMULATE NFC SCAN</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center"
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

export default withNavigationFocus(
  connect(mapStateToProps, mapDispatchToProps)(NFCScan)
);
