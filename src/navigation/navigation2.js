import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profil from '../screen/allRole/Profil/Profile';
import Home from '../screen/member/home';
const Drawer = createDrawerNavigator();

function Rumah1() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <Profil {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

export default Rumah1;
