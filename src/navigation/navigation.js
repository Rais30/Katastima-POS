import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../components/splash/splash';
import Intro from '../components/intro/intro';
import Register from '../screen/allRole/register/Register';
import LogIn from '../screen/allRole/logIn/LogIn';
import EditProfil from '../screen/allRole/Update/Profil';
import Rumah from './navigatio1';
import cariBarang from '../screen/allRole/cariBarang/cariBarang';
import Rumah1 from './navigation2';
import Rumah4 from './navigation4';
import Rumah3 from './navigation3';
import Password from '../screen/allRole/Update/Password';
import RegisMember from '../screen/kasir/RegisMember';
import Respon from '../screen/allRole/BoxRespos/Respon';
import TabRumah from '../screen/kasir/navigationKasir/navigationBottom';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splas"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Rumah" component={Rumah} />
        <Stack.Screen name="EditProfil" component={EditProfil} />
        <Stack.Screen name="Cari" component={cariBarang} />
        <Stack.Screen name="Rumah1" component={Rumah1} />
        <Stack.Screen name="Rumah3" component={Rumah3} />
        <Stack.Screen name="Rumah4" component={Rumah4} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="RegisMember" component={RegisMember} />
        <Stack.Screen name="Respon" component={Respon} />
        <Stack.Screen name="TabRumah" component={TabRumah} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
