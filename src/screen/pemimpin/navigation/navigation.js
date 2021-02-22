import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LtPenjualan from '../LtPenjualan';
import LtPembelian from '../LtPembelian';
import LlabaRugi from '../Llaba-Rugi';
import Home from '../Home';
const Tab = createMaterialBottomTabNavigator();

function TabRumah() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'LtPembelian') {
            iconName = focused ? 'shopping-bag' : 'shopping-bag';
          } else if (route.name === 'LtPenjualan') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'LlabaRugi') {
            iconName = focused ? 'account-circle' : 'account-circle';
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
        component={Home}
      />
      <Tab.Screen name="LtPembelian" component={LtPembelian} />
      <Tab.Screen name="LtPenjualan" component={LtPenjualan} />
      <Tab.Screen name="LlabaRugi" component={LlabaRugi} />
    </Tab.Navigator>
  );
}
export default TabRumah;
