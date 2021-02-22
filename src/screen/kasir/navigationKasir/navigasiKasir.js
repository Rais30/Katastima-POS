import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RegisMember from '../RegisMember';
import TopUp from '../TopUp';

const Tap = createMaterialTopTabNavigator();

function TopTabRumah() {
  return (
    <Tap.Navigator>
      <Tap.Screen name="Member baru" component={RegisMember} />
      <Tap.Screen name="Top Up" component={TopUp} />
    </Tap.Navigator>
  );
}
export default TopTabRumah;
