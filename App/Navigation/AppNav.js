import React, {Component} from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icons from 'react-native-vector-icons/SimpleLineIcons';

import { ScanStack, ReceiptStack, ProfileStack } from './AppStackNavs';

export default TabNavigator({
  Receipts: { screen: ReceiptStack },
  Scan: { screen: ScanStack },
  Profile: { screen: ProfileStack },
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Scan') {
        iconName = `energy`;
      } else if (routeName === 'Receipts') {
        iconName = `layers`;
      } else if (routeName === 'Profile') {
        iconName = `user`;
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
  swipeEnabled: true,
});
