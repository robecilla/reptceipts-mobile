import React, {Component} from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icons from 'react-native-vector-icons/SimpleLineIcons';

import Scan from '../Components/Scan/Scan';
import Receipts from '../Components/Receipts/Receipts';
import Settings from '../Components/Settings/Settings';

export default TabNavigator({
  Scan: { screen: Scan },
  Receipts: { screen: Receipts },
  Settings: { screen: Settings },
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
      } else if (routeName === 'Settings') {
        iconName = `settings`;
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
