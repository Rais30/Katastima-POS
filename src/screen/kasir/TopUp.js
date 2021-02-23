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
  Modal,
  ToastAndroid,
} from 'react-native';

import styles from '../../assets/style/boxAllRole/boxCari/boxCari';

export class TopUp extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      dataInput: '',
      loading: false,
      loading1: false,
      modal: false,
      saldo: '',
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
  Saldo = () => {
    const {saldo, id, token} = this.state;
    const url = 'https://katastima-pos.herokuapp.com/api/kasir/member/top-up';
    const data = {
      nominal: saldo,
      member_id: id,
    };
    this.setState({loading1: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resjson) => {
        const {status} = resjson;
        if (status == 'success') {
          console.log('ini respon nya ', resjson);
          ToastAndroid.show(
            ' TopUp Berasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({loading1: false, modal: false});
        } else {
          this.setState({loading1: false});
          ToastAndroid.show(
            ' TopUp Member Gagal',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch((error) => {
        this.setState({loading1: false});
        console.log('error adalah ' + error);
      });
  };
  render() {
    const {data, loading, modal, loading1} = this.state;
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
                      onPress={() => this.setState({modal: true, id: val.id})}>
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
        <Modal
          visible={modal}
          transparent
          onRequestClose={() => this.setState({modal: false})}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.modal}>
              <TextInput
                placeholder="Rp.0,-"
                onChangeText={(taks) => this.setState({saldo: taks})}
                keyboardType="number-pad"
              />
              <TouchableNativeFeedback onPress={() => this.Saldo()}>
                {loading1 ? (
                  <ActivityIndicator size={30} color="white" />
                ) : (
                  <View style={styles.tombol}>
                    <Text style={styles.taksTombol}> TopUp </Text>
                  </View>
                )}
              </TouchableNativeFeedback>
            </View>
          </View>
        </Modal>
      </View>
      // <View>
      //   <Text> ini TopUp memeber</Text>
      // </View>
    );
  }
}

export default TopUp;
