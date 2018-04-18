import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigationFocus } from "react-navigation";
import * as userActions from "../Actions/User";

import styles from "../styles";

import QRScan from "../Components/Scan/QRScan";
import NFCScan from "../Components/Scan/NFCScan";

import QRButtonHeader from "../Components/Scan/QRButtonHeader";
import NFCButtonHeader from "../Components/Scan/NFCButtonHeader";

export const ScanStack = initialRouteName => {
  const Scan = StackNavigator(
    {
      QRScan: {
        screen: QRScan,
        navigationOptions: ({ navigation }) => {
          return {
            headerTitle: "QR",
            headerRight: <NFCButtonHeader navigation={navigation} />,
            headerStyle: {
              backgroundColor: styles.headerColor
            },
            headerTintColor: "#fff"
          };
        }
      },
      NFCScan: {
        screen: NFCScan,
        navigationOptions: ({ navigation }) => {
          return {
            headerTitle: "NFC",
            headerRight: <QRButtonHeader navigation={navigation} />,
            headerStyle: {
              backgroundColor: styles.headerColor
            },
            headerTintColor: "#fff"
          };
        }
      }
    },
    {
      ...initialRouteName
    }
  );

  return <Scan />;
};

class ConnectedScanStack extends React.Component {
  render() {
    if (typeof this.props.user === "undefined") {
      return false;
    }
    let initialRoute = this.props.user.scan_type === 1 ? "QRScan" : "NFCScan";
    return <ScanStack initialRouteName={initialRoute} />;
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default withNavigationFocus(
  connect(mapStateToProps, null)(ConnectedScanStack)
);
