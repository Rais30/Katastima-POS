import React, {Component} from 'react';
import {Text, View, Image, TouchableNativeFeedback} from 'react-native';
import styles from '../../assets/style/boxStaff/index';
export class Home extends Component {
  render() {
    return (
      <View style={styles.utama}>
        <View>
          <Text> Tambah Barang Di Gudang </Text>
        </View>
      </View>
    );
  }
}

export default Home;
