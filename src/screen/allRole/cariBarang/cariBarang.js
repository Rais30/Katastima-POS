import React, {Component} from 'react';
import {Text, View, TextInput, TouchableHighlight} from 'react-native';
import styles from '../../../assets/style/boxAllRole/boxCari/boxCari';
export class cariBarang extends Component {
  render() {
    return (
      <View style={styles.utama}>
        <Text> Cari Barang </Text>
      </View>
    );
  }
}

export default cariBarang;
