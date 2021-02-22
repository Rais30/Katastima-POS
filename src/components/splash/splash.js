import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../style/boxSplashIntro/SplashIntro';

export class Splash extends Component {
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        AsyncStorage.getItem('role').then((role) => {
          console.log(role);
          if (role == 'kasir') {
            console.log(role, 'masuk ke aplikasi');
            this.props.navigation.replace('Rumah');
          } else if (role == 'staff') {
            console.log(role, 'masuk ke aplikasi');
            this.props.navigation.replace('Rumah3');
          } else if (role == 'member') {
            console.log(role, 'masuk ke aplikasi');
            this.props.navigation.replace('Rumah1');
          } else if (role == 'pimpinan') {
            console.log(role, 'masuk ke aplikasi');
            this.props.navigation.replace('Rumah4');
          } else {
            console.log('anda orang asing masuk ke aplikasi');
          }
        });
      } else {
        setTimeout(() => {
          this.props.navigation.replace('Intro');
        }, 3000);
      }
    });
  }
  render() {
    return (
      <View style={styles.utama}>
        <View>
          <Image
            source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
            style={styles.logoK}
          />
        </View>
        <View>
          <Text style={styles.teksLogo}> Katastima </Text>
        </View>
      </View>
    );
  }
}

export default Splash;
