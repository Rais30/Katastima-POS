import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Splash from '../components/splash/splash';
import Intro from '../components/intro/intro';
import Register from '../screen/allRole/register/Register';
import LogIn from '../screen/allRole/logIn/LogIn';
import EditProfil from '../screen/allRole/Update/Profil';
import Rumah from './navigatio1';
import cariBarang from '../screen/allRole/cariBarang/cariBarang';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
