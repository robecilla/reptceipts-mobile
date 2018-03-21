import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';

import QRScan from '../Components/Scan/QRScan';
import NFCScan from '../Components/Scan/NFCScan';
import Receipts from '../Components/Receipts/Receipts';
import Profile from '../Components/Profile/Profile';
import SoloReceipt from '../Components/SoloReceipt/SoloReceipt';

import Fav from '../Components/SoloReceipt/Fav';
import Search from '../Components/Receipts/Search';
import QRButtonHeader from '../Components/Scan/QRButtonHeader';
import NFCButtonHeader from '../Components/Scan/NFCButtonHeader';

const defaultScan = 'qr';

export const ScanStack = StackNavigator({
    QRScan: {
        screen: QRScan,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'QR',
                headerRight: <NFCButtonHeader navigation={navigation} />
            }
        },
    },
    NFCScan: {
        screen: NFCScan,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'NFC',
                headerRight: <QRButtonHeader navigation={navigation} />
            }
        },
    },
},
{
    initialRouteName: defaultScan == 'qr' ? 'QRScan' : 'NFCScan'
});

export const ReceiptStack = StackNavigator({
    Receipts: {
        screen: Receipts,
        navigationOptions: {
            headerTitle: 'Receipts',
            headerRight: <Search />
        },
    },
    SoloReceipt: {
        screen: SoloReceipt,
        navigationOptions: {
            headerRight: <Fav />
        }
    }
});


export const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerTitle: 'Profile'
        },
    }
});
