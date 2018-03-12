import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icons from 'react-native-vector-icons/SimpleLineIcons';

import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';

export default TabNavigator({
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
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
});
