import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../kasir/Home';
import TopTabRumah from '../kasir/navigationKasir/navigasiKasir';
import Shift from '../kasir/Shift';
import Home1 from '../staf/Home';
import Tbarang from '../staf/Tbarang';

const Tab = createMaterialBottomTabNavigator();

function TabRumah12() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Shift') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'Member') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'Home1') {
            iconName = focused ? 'history' : 'history';
          } else if (route.name === 'Tbarang') {
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
        component={Home}
      />

      <Tab.Screen name="Shift" component={Shift} />
      <Tab.Screen name="Member" component={TopTabRumah} />
      <Tab.Screen name="Home1" component={Home1} />
      <Tab.Screen name="Tbarang" component={Tbarang} />
    </Tab.Navigator>
  );
}
export default TabRumah12;
