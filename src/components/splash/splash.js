import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../style/boxSplashIntro/SplashIntro';

export class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('Intro');
    }, 5000);
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
