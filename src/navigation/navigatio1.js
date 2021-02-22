import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profil from '../screen/allRole/Profil/Profile';
import Home from '../screen/kasir/Home';
import navigationBottom from '../screen/kasir/navigationKasir/navigationBottom';

const Drawer = createDrawerNavigator();

function Rumah() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <Profil {...props} />}>
      <Drawer.Screen name="Home" component={navigationBottom} />
    </Drawer.Navigator>
  );
}

export default Rumah;
