import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../Home';
import Tbarang from '../Tbarang';

const Tap = createMaterialTopTabNavigator();

function TapRumah() {
  return (
    <Tap.Navigator>
      <Tap.Screen name="Tambah Barang" component={Home} />
      <Tap.Screen name="Barang Baru" component={Tbarang} />
    </Tap.Navigator>
  );
}
export default TapRumah;
