import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import styles from '../../assets/style/boxAllRole/boxCari/boxCari';

export class Member extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      dataInput: '',
      loading: false,

      id: '',
    };
  }
  GetMember() {
    console.log('get  barang');
    const {token, dataInput} = this.state;
    const q = dataInput !== '' ? `/${dataInput}` : '';
    const url = `https://katastima-pos.herokuapp.com/api/kasir/member/cari${q}`;
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
        this.setState({data: resjson, loading: false});
        console.log('barang ', resjson);
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading: false, dataInput: this.state.kosong});
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        this.GetMember();
      } else {
        console.log('tidak ada token');
      }
    });
  }
  CariMember() {
    console.log('get  barang');
    const {token, dataInput} = this.state;
    const q = dataInput !== '' ? `/${dataInput}` : '';
    const url = `https://katastima-pos.herokuapp.com/api/kasir/member/cari${q}`;
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
        this.setState({data: resjson, loading: false});
        console.log('barang ', resjson);
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading: false, dataInput: this.state.kosong});
      });
  }

  render() {
    const {data, loading} = this.state;
    return (
      <View style={styles.utama}>
        <View style={styles.boxInput}>
          <TextInput
            style={{flex: 1}}
            placeholder="Member"
            onChangeText={(taks) => this.setState({dataInput: taks})}
          />
          <TouchableOpacity onPress={(taks) => this.CariMember()}>
            <Image
              source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
              style={styles.Icon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {data == null ? (
            <View>
              {loading ? (
                <View></View>
              ) : (
                <ActivityIndicator size={50} color="red" />
              )}
            </View>
          ) : (
            <View>
              {data.map((val, key) => {
                return (
                  <View key={key}>
                    <TouchableNativeFeedback
                      onPress={() =>
                        this.props.navigation.navigate('TabRumah', {
                          Member: data,
                        })
                      }>
                      <View style={styles.boxDataMap}>
                        <Text>{'Kode : ' + val.kode_member}</Text>
                        <Text>{'Nama : ' + val.nama}</Text>
                        <Text>{'Saldo : ' + val.saldo}</Text>
                        <Text>{'No Telephone : ' + val.no_telephone}</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Member;
