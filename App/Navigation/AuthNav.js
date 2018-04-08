import React, { Component } from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import styles from '../styles';

import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';

const Auth = TabNavigator({
    Login: { screen: Login },
    Register: { screen: Register },
},
{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Login') {
                iconName = 'login';
            } else if (routeName === 'Register') {
                iconName = 'logout';
            }

            return <Icons name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: styles.headerColor,
        inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    lazyLoad: true,
});

export default StackNavigator({
    Auth: { 
        screen: Auth,
        navigationOptions: {
            title: 'reptceipts',
            headerStyle: {
                backgroundColor: styles.headerColor
            },
            headerTintColor: '#fff'
        },
    }
  });
