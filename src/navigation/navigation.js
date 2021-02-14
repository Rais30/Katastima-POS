import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Splash from '../components/splash/splash';
import Intro from '../components/intro/intro';
import Register from '../screen/allRole/register/Register';
import LogIn from '../screen/allRole/logIn/LogIn';
import Home from '../screen/kasir/Home';
import Profile from '../screen/kasir/Profile';
Profile;

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Top = createMaterialTopTabNavigator();

function Rumah() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <Profile {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
class Navigation extends React.Component {
  render() {
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
          <Stack.Screen name="Profil" component={Profile} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Rumah" component={Rumah} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Navigation;
