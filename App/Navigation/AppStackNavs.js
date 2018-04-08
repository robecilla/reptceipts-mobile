import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import styles from '../styles';

import Receipts from '../Components/Receipts/Receipts';
import Profile from '../Components/Profile/Profile';
import SoloReceipt from '../Components/SoloReceipt/SoloReceipt';
import Edit from '../Components/Profile/Edit';
import SaveEdit from '../Components/Profile/SaveEdit';

import Pencil from '../Components/Profile/Pencil';
import Delete from '../Components/SoloReceipt/Delete';
import Search from '../Components/Receipts/Search';

export const ReceiptStack = StackNavigator({
    Receipts: {
        screen: Receipts,
        navigationOptions: {
            headerTitle: 'Receipts',
            headerRight: <Search />,
            headerStyle: {
                backgroundColor: styles.headerColor
            },
            headerTintColor: '#fff'
        },
    },
    SoloReceipt: {
        screen: SoloReceipt,
        navigationOptions: ({ navigation }) => {
            const { params } = navigation.state;
            return {
                headerRight: <Delete receipt_id={params.id} navigate={navigation.navigate}/>,
                headerStyle: {
                    backgroundColor: styles.headerColor
                },
                headerTintColor: '#fff'
            }
        },
    }
});

export const ProfileStack = StackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Profile',
                headerRight: <Pencil navigation={navigation} />,
                headerStyle: {
                    backgroundColor: styles.headerColor
                },
                headerTintColor: '#fff'
            }
        }
    },
    Edit: {
        screen: Edit,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: 'Edit Profile',
                headerRight: <SaveEdit navigate={navigation.navigate} />,
                headerStyle: {
                    backgroundColor: styles.headerColor
                },
                headerTintColor: '#fff'
            }
        }
    }
});
