import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../../assets/style/boxPimpinan/index';

export class LtPenjualan extends Component {
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headher} />
        <Text> Laporan Trans Penjualan </Text>
      </View>
    );
  }
}

export default LtPenjualan;
