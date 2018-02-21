import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Components/Home/Home';
import Receipts from './Components/Receipts/Receipts';

export default TabNavigator({
  Home: { screen: Home },
  Receipts: { screen: Receipts },
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
});
