import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import styles from '../../assets/style/boxPimpinan/index';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      months: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ],
      date: '',
      month: '',
      year: '',
      tanggal: '',
      dataShift: [],
      loading: false,
      modal: false,
      dataDetail: [],
    };
  }
  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();

    this.setState({
      date: date,
      month: month,
      year: year,
      tanggal: `${month < 10 ? '0' + month : month}-${year}`,
    });
    this.Lshift();
  };
  Lshift() {
    console.log('Laporan Penjualan');
    const {token, tanggal} = this.state;
    const url = `https://katastima-pos.herokuapp.com/api/pimpinan/laporan/transaksi_penjualan/${tanggal}`;
    this.setState({loading: true});
    console.log('ini tanggal nya : ', tanggal);
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resPon) => {
        const {status} = resPon;
        console.log('ini respon nya : ', resPon);
        if (status == 'success') {
          this.setState({dataShift: resPon.data.penjualan});
          console.log('ini ada Absensi :', resPon.data.penjualan);
          this.setState({loading: false});
        } else {
          console.log('ini respon Else', resPon);
          this.setState({loading: false});
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('ini respon error nya : ', error);
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        this.ShowCurrentDate();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  Penjualan = () => {
    if (this.state.dataShift[0].bulan != null) {
      console.log('ini perTahun');
      return (
        <View>
          {this.state.dataShift.map((val, key) => {
            return (
              <View key={key}>
                <TouchableNativeFeedback>
                  <View style={styles.boxDataMap}>
                    <Text>{'Bulan : ' + val.bulan}</Text>
                    <Text>{'Kasir : ' + val.jumlah_kasir}</Text>
                    <Text>{'Penjualan : ' + val.jumlah_penjualan}</Text>

                    <Text>{'Transaksi Member : ' + val.transaksi_member}</Text>
                    <Text>
                      {'Transakasi Non Member : ' + val.transaksi_non_member}
                    </Text>

                    <View style={styles.sty}>
                      <Text>{'Barang :' + val.jumlah_produk_terjual}</Text>
                      <Text>{'Penjualan : Rp.' + val.total_penjualan}</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              </View>
            );
          })}
        </View>
      );
    } else {
      console.log('ini perBulan');
      return (
        <View>
          {this.state.dataShift.map((val, key) => {
            return (
              <View key={key}>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.setState({
                      modal: true,
                      dataDetail: val.penjualan_per_hari,
                    })
                  }>
                  <View style={styles.boxDataMap}>
                    <Text>{'Nama : ' + key + 1}</Text>
                    <Text>{'Tanggal : ' + val.jumlah_kasir}</Text>
                    <Text>{'Mulai Shift : ' + val.jumlah_penjualan}</Text>
                    <Text>{'Akhir Shift : ' + val.jumlah_kasir}</Text>
                    <Text>{'Akhir Shift : ' + val.transaksi_member}</Text>
                    <Text>{'Akhir Shift : ' + val.transaksi_non_member}</Text>

                    <View style={styles.sty}>
                      <Text>{'Barang :' + val.jumlah_produk_terjual}</Text>
                      <Text>{'Pemeblian : Rp.' + val.total_penjualan}</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              </View>
            );
          })}
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.boxInput}>
          <TextInput
            style={{flex: 1}}
            value={this.state.tanggal}
            keyboardType="number-pad"
            onChangeText={(taks) => this.setState({tanggal: taks})}
          />
          <TouchableNativeFeedback onPress={() => this.Lshift()}>
            <Image
              style={styles.Icon}
              source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
            />
          </TouchableNativeFeedback>
        </View>
        <ScrollView>
          {this.state.loading ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={50} color="blue" />
            </View>
          ) : (
            <>
              {this.state.dataShift.length == 0 ? (
                <View
                  style={{
                    margin: 10,
                    backgroundColor: 'white',
                    borderRadius: 7,
                    alignSelf: 'center',
                    padding: 10,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
                    Belum ada Laporan yang Masuk
                  </Text>
                </View>
              ) : (
                <View>{this.Penjualan()}</View>
              )}
            </>
          )}
        </ScrollView>
        <Modal
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: false})}
          animationType="fade"
          transparent>
          <View style={styles.modal}>
            <ScrollView>
              {this.state.dataDetail.map((val, key) => {
                return (
                  <View
                    key={key}
                    style={{
                      padding: 3,
                      borderRadius: 7,
                      margin: 10,
                    }}>
                    <Text>Kode Transaksi : {val.kode_transaksi}</Text>
                    <Text>Nama : {val.nama_kasir}</Text>
                    <Text>Kode Kasir : {val.kode_kasir}</Text>
                    <Text>Total : {val.total_price}</Text>
                    <Text>Tanggal : {val.tanggal}</Text>
                    <Text>Waktu : {val.waktu_transaksi}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Home;
