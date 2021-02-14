import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from '../../../assets/style/boxAllRole/boxUpdate/Update';

export class Profil extends Component {
  render() {
    return (
      <View style={styles.utama}>
        <Text> Ini ganti Profil </Text>
      </View>
    );
  }
}

export default Profil;
