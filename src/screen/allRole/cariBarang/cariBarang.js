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
} from 'react-native';

import styles from '../../../assets/style/boxAllRole/boxCari/boxCari';

export class cariBarang extends Component {
  constructor() {
    super();
    this.state = {
      dataInput: '',
      dataMap: [],
      loading: false,
      loading1: false,
      token: '',
      modal: false,
      kosong: '',
      jBarang: 0,
      idBarang: '',
      penjualan_id: '',
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
        this.setState({loading: false, dataInput: this.state.kosong});
      });
  };
  GetBarang1 = () => {
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
        this.setState({loading: false, dataInput: this.state.kosong});
      });
  };
  TambahBatang = () => {
    console.log('get  barang');
    const {token, jBarang, idBarang, penjualan_id} = this.state;
    const data = {
      product_id: idBarang,
      quantity: jBarang,
      penjualan_id: penjualan_id,
    };
    const url = `https://katastima-pos.herokuapp.com/api/kasir/penjualan/create-detail`;
    this.setState({loading1: true});
    console.log(token);
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
        const {kode_transaksi} = resjson;
        if (kode_transaksi != null) {
          console.log('ini respon : ', resjson);
          this.setState({loading1: false, modal: false});
          this.props.navigation.navigate('RumahKasir');
        } else {
          console.log('ini adalah res else nya : ', resjson);
          this.setState({loading1: false, modal: false});
        }
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading1: false, modal: false});
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        console.log(this.state.token);
        this.setState({penjualan_id: this.props.route.params.id});
        console.log('ini di penjualan : ', this.state.penjualan_id);
        this.GetBarang1();
      } else {
        console.log('tidak ada token');
      }
    });
  }
  Tambah = () => {
    this.setState({jBarang: this.state.jBarang + 1});
  };
  Kurang = () => {
    this.setState({jBarang: this.state.jBarang - 1});
  };
  render() {
    return (
      <View style={styles.utama}>
        <View>
          <View style={styles.boxInput}>
            <TextInput
              style={{flex: 1}}
              placeholder="Pencarian"
              onChangeText={(taks) => this.setState({dataInput: taks})}
            />
            <TouchableNativeFeedback onPress={() => this.GetBarang()}>
              <Image
                style={styles.Icon}
                source={require('../../../assets/logoAplikasi/pngaaa.com-607749.png')}
              />
            </TouchableNativeFeedback>
          </View>
          <ScrollView>
            {this.state.dataMap == '' ? (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size={50} color="blue" />
              </View>
            ) : (
              <View>
                {this.state.dataMap.map((val, key) => {
                  return (
                    <View key={key}>
                      <TouchableNativeFeedback
                        onPress={() =>
                          this.setState({modal: true, idBarang: val.id})
                        }>
                        <View style={styles.boxDataMap}>
                          <Text>{'Kode Barang : ' + val.UID}</Text>
                          <Text>{'nama : ' + val.nama}</Text>
                          <Text>{'merek : ' + val.merek}</Text>
                          <Text>{'stok : ' + val.stok}</Text>
                          <View style={styles.sty}>
                            <Text>{'harga : Rp.' + val.harga_jual}</Text>
                            <Text>{'diskon : Rp.' + val.diskon}</Text>
                          </View>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>
          <Modal
            visible={this.state.modal}
            transparent
            animationType="slide"
            onRequestClose={() => this.setState({modal: false})}>
            <View
              style={{
                ...styles.utama,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.modal}>
                <View style={{...styles.sty, justifyContent: 'space-between'}}>
                  <Text> Jumlah Barang : </Text>
                  <Text>{this.state.jBarang}</Text>
                </View>
                <View style={styles.sty}>
                  <TouchableOpacity
                    onPress={() => this.Tambah()}
                    style={{...styles.tombol, backgroundColor: 'green'}}>
                    <Text>T</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.Kurang()}
                    style={{...styles.tombol, backgroundColor: 'red'}}>
                    <Text>K</Text>
                  </TouchableOpacity>
                </View>
                <TouchableNativeFeedback onPress={() => this.TambahBatang()}>
                  {this.state.loading1 ? (
                    <ActivityIndicator size={30} color="white" />
                  ) : (
                    <View style={styles.tombol}>
                      <Text style={styles.taksTombol}> Tambah </Text>
                    </View>
                  )}
                </TouchableNativeFeedback>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

export default cariBarang;
