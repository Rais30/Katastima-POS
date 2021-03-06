import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../../assets/style/boxPimpinan/index';

export class LtPembelian extends Component {
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headher} />

        <Text> Laporan Trans Pembelian </Text>
      </View>
    );
  }
}

export default LtPembelian;
