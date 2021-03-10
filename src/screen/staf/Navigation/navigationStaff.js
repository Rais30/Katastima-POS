import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Gudang from '../gudang';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Tap from '../Tap';
import Pengeluaran from '../Pengeluaran';

const Tab = createMaterialBottomTabNavigator();

function TabRumahStaf() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'LtPenjualan') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'Pengeluaran') {
            iconName = focused ? 'history' : 'history';
          }
          return <Icon name={iconName} size={25} color={color} />;
        },
      })}>
      <Tab.Screen
        tabBarIcon={{
          activeTintColor: '#fcf8f8',
          inactiveTintColor: 'gray',
          showLabel: false,
        }}
        name="Home"
        component={Tap}
      />

      <Tab.Screen name="LtPenjualan" component={Gudang} />
      <Tab.Screen name="Pengeluaran" component={Pengeluaran} />
    </Tab.Navigator>
  );
}
export default TabRumahStaf;
