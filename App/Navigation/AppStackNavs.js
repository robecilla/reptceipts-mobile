import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import styles from "../styles";

import Receipts from "../Components/Receipts/Receipts";
import Profile from "../Components/Profile/Profile";
import SoloReceipt from "../Components/SoloReceipt/SoloReceipt";
import Edit from "../Components/Profile/Edit";
import SaveEdit from "../Components/Profile/SaveEdit";

import QRScan from "../Components/Scan/QRScan";
import NFCScan from "../Components/Scan/NFCScan";
import ScanResult from "../Components/Scan/ScanResult";

import QRButtonHeader from "../Components/Scan/QRButtonHeader";
import NFCButtonHeader from "../Components/Scan/NFCButtonHeader";

import Pencil from "../Components/Profile/Pencil";
import Delete from "../Components/SoloReceipt/Delete";
import Search from "../Components/Receipts/Search";

export const ReceiptStack = StackNavigator({
  Receipts: {
    screen: Receipts,
    navigationOptions: {
      headerTitle: "Receipts",
      headerRight: <Search />,
      headerStyle: {
        backgroundColor: styles.headerColor
      },
      headerTintColor: "#fff"
    }
  },
  SoloReceipt: {
    screen: SoloReceipt,
    navigationOptions: ({ navigation }) => {
      const { params } = navigation.state;
      return {
        headerRight: <Delete receipt_id={params.id} navigation={navigation} />,
        headerStyle: {
          backgroundColor: styles.headerColor
        },
        headerTintColor: "#fff"
      };
    }
  }
});

export const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Profile",
        headerRight: <Pencil navigation={navigation} />,
        headerStyle: {
          backgroundColor: styles.headerColor
        },
        headerTintColor: "#fff"
      };
    }
  },
  Edit: {
    screen: Edit,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Edit Profile",
        headerRight: <SaveEdit navigation={navigation} />,
        headerStyle: {
          backgroundColor: styles.headerColor
        },
        headerTintColor: "#fff"
      };
    }
  }
});

export const ConnectedScanStack = ({ initialRouteName }) => {
  const ScanStack = StackNavigator(
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
      },
      ScanResult: {
        screen: ScanResult,
        navigationOptions: {
          headerStyle: {
            backgroundColor: styles.headerColor
          }
        }
      }
    },
    { initialRouteName }
  );
  return <ScanStack />;
};

const ScanWithProps = props => (
  <ConnectedScanStack
    initialRouteName={props.user.scan_type === 1 ? "QRScan" : "NFCScan"}
  />
);

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(ScanWithProps);
