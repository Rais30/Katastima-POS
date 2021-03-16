import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LtPenjualan from '../LtPenjualan';
import LtPembelian from '../LtPembelian';
import LlabaRugi from '../Llaba-Rugi';
import Home from '../Home';
import Lstok from './Lstok';

const Tab = createMaterialBottomTabNavigator();

function TabRumah() {
  return (
    <Tab.Navigator
      initialRouteName="Absensi"
      shifting={true}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Absensi') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Pembelian') {
            iconName = focused ? 'shopping-bag' : 'shopping-bag';
          } else if (route.name === 'Penjualan') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'Laba-Rugi') {
            iconName = focused ? 'account-circle' : 'account-circle';
          } else if (route.name === 'Stok Barang') {
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
        name="Absensi"
        component={Home}
      />
      <Tab.Screen name="Pembelian" component={LtPembelian} />
      <Tab.Screen name="Penjualan" component={LtPenjualan} />
      <Tab.Screen name="Laba-Rugi" component={LlabaRugi} />
      <Tab.Screen name="Stok Barang" component={Lstok} />
    </Tab.Navigator>
  );
}
export default TabRumah;
