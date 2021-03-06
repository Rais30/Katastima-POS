import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profil from '../screen/allRole/Profil/Profile';
import TabRumah12 from '../screen/admin/BottobTabNavi';

const Drawer = createDrawerNavigator();

function Rumah5() {
  return (
    <Drawer.Navigator
      initialRouteName="AllRolle"
      drawerContent={(props) => <Profil {...props} />}>
      <Drawer.Screen name="AllRolle" component={TabRumah12} />
    </Drawer.Navigator>
  );
}

export default Rumah5;
