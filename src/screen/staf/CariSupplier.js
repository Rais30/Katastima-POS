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
      id_staf: '',
      idBarang: '',
    };
  }

  GetBarang = () => {
    console.log('get  barang');
    const {token, dataInput} = this.state;
    const q = dataInput !== '' ? `/${dataInput}` : '';
    const url = `https://katastima-pos.herokuapp.com/api/staff/cari-supplier${q}`;
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
    const url = `https://katastima-pos.herokuapp.com/api/staff/cari-supplier${q}`;
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
  TambahStaf = () => {
    console.log('get  barang');
    const {token, id_staf} = this.state;
    const q = id_staf !== '' ? `/${id_staf}` : '';
    const url = `https://katastima-pos.herokuapp.com/api/staff/pembelian/form${q}`;
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
        console.log('ini adalah staf : ', resjson);
        this.props.navigation.navigate('TabRumahStaf');
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading: false, dataInput: this.state.kosong});
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        console.log(this.state.token);

        this.GetBarang1();
      } else {
        console.log('tidak ada token');
      }
    });
  }
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
                          <Text>{'Nama : ' + val.nama_supplier}</Text>
                          <Text>{'Alamat : ' + val.alamat_supplier}</Text>
                          <Text>{'Telephone : ' + val.telepon_supplier}</Text>
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
                <TouchableNativeFeedback onPress={() => this.TambahStaf()}>
                  {this.state.loading1 ? (
                    <ActivityIndicator size={30} color="blue" />
                  ) : (
                    <View style={styles.tombol}>
                      <Text style={styles.taksTombol}> Get Supplier </Text>
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
