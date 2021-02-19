import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import styles from '../../../assets/style/boxAllRole/boxCari/boxCari';

export class cariBarang extends Component {
  constructor() {
    super();
    this.state = {
      dataInput: '',
      dataMap: [],
      loading: false,
      token: '',
    };
  }
  GetBarang = () => {
    console.log('get  barang');
    const {token, dataInput} = this.state;
    const q = dataInput !== '' ? `/${dataInput}` : '';
    const url = `https://katastima-pos.herokuapp.com/api/cari-barang${q}`;
    this.setState({loading: true});
    console.log(token);
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resjson) => {
        this.setState({dataMap: resjson, loading: false});
        console.log('barang ', resjson);
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading: false});
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token}, () => this.GetBarang());
        console.log(this.state.token);
      } else {
        console.log('tidak ada token');
      }
    });
  }
  render() {
    return (
      <View style={styles.utama}>
        {this.state.dataMap == '' ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={50} color="blue" />
          </View>
        ) : (
          <Text> ada Barang </Text>
        )}
      </View>
    );
  }
}

export default cariBarang;
