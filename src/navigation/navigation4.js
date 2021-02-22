import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profil from '../screen/allRole/Profil/Profile';
import TabRumah from '../screen/pemimpin/navigation/navigation';
const Drawer = createDrawerNavigator();

function Rumah4() {
  return (
    <Drawer.Navigator
      initialRouteName="TabRumah"
      drawerContent={(props) => <Profil {...props} />}>
      <Drawer.Screen name="TabRumah" component={TabRumah} />
    </Drawer.Navigator>
  );
}

export default Rumah4;
