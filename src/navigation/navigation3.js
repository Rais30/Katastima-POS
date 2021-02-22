import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profil from '../screen/allRole/Profil/Profile';

import TabRumah from '../screen/staf/Navigation/navigationStaff';

const Drawer = createDrawerNavigator();

function Rumah3() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <Profil {...props} />}>
      <Drawer.Screen name="Home" component={TabRumah} />
    </Drawer.Navigator>
  );
}

export default Rumah3;
