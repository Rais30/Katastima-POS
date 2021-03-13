import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import styles from '../../assets/style/boxStaff/index';

export class Pengeluaran extends Component {
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
      month: '',
      date: '',
      year: '',
      beban_id: '',
      subtotal_pengeluaran: '',
      deskripsi: '',
      tanggal: '',
      loading: false,
      JKeluaran: '',
      modal: false,
      dataRes: [],
    };
  }

  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    this.setState({
      date: date,
      month: month,
      year: year,
      tanggal: `${date < 10 ? '0' + date : date}-${
        month < 10 ? '0' + month : month
      }-${year}`,
    });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        console.log(this.state.token);
        this.ShowCurrentDate();
      } else {
        console.log('tidak ada token');
      }
    });
  }
  Laporan = () => {
    console.log('laporan');
    const {
      tanggal,
      beban_id,
      subtotal_pengeluaran,
      deskripsi,
      token,
    } = this.state;
    const data = {
      tanggal: tanggal,
      beban_id: beban_id,
      deskripsi: deskripsi,
      subtotal_pengeluaran: subtotal_pengeluaran,
    };
    const url =
      'https://katastima-pos.herokuapp.com/api/staff/pengeluaran/make';
    this.setState({loading: true});
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
      .then((respon) => {
        const {tanggal, detail_pengeluaran} = respon;
        if (tanggal != '') {
          console.log('ini respon dari laporan : ', respon);
          this.setState({dataRes: detail_pengeluaran});
          ToastAndroid.show(
            ' Laporan Berasil Di Imput ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({loading: false, modal: true});
        } else {
          console.log(' respon dari Laporan : ', respon);
        }
      })
      .catch((error) => {
        console.log('ini ada dari laporan error', error);
        this.setState({loading: false});
      });
  };
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headher}>
          <Text style={styles.tittel}> Laporan Pengeluaran</Text>
        </View>
        <ScrollView>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Tanggal :</Text>
            <TextInput
              value={`${this.state.tanggal}`}
              onChangeText={(taks) => this.setState({tanggal: taks})}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Jenis Pengeluaran : </Text>
            <View style={styles.boxDataInput}>
              <Text style={styles.font}> {this.state.JKeluaran}</Text>
            </View>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    beban_id: '1',
                    JKeluaran: 'Beban Gaji Karyawan',
                  })
                }
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Gaji Karyawan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({beban_id: '2', JKeluaran: 'Beban Listrik'})
                }
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Listrik</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({beban_id: '3', JKeluaran: 'Beban Air'})
                }
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Air</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    beban_id: '4',
                    JKeluaran: 'Beban Penyewaan Gedung',
                  })
                }
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Penyewaan Gedung</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    beban_id: '5',
                    JKeluaran: 'Beban Angkut Penjualan',
                  })
                }
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Angkut Penjualan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    beban_id: '6',
                    JKeluaran: 'Harga Pokok Penjualan',
                  })
                }
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Harga Pokok Penjualan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({beban_id: '7', JKeluaran: 'Beban Lain-Lain'})
                }
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Beban Lain-Lain</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Deskripsi :</Text>
            <TextInput
              placeholder="Deskripsi"
              onChangeText={(taks) => this.setState({deskripsi: taks})}
            />
          </View>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Total Pengeluaran :</Text>
            <TextInput
              placeholder="Jumlah Barang"
              onChangeText={(taks) =>
                this.setState({subtotal_pengeluaran: taks})
              }
              keyboardType="number-pad"
            />
          </View>
          <TouchableNativeFeedback onPress={() => this.Laporan()}>
            <View
              style={{
                ...styles.headher,
                alignSelf: 'center',
                borderRadius: 10,
                marginVertical: 30,
              }}>
              {this.state.loading ? (
                <ActivityIndicator size={30} color="white" />
              ) : (
                <Text style={styles.tittel}> Buat Laporan </Text>
              )}
            </View>
          </TouchableNativeFeedback>
        </ScrollView>
        <Modal
          visible={this.state.modal}
          animationType="fade"
          onRequestClose={() => this.setState({modal: false})}
          transparent>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            {this.state.dataRes.map((v, k) => {
              return (
                <View
                  key={k}
                  style={{padding: 5, margin: 10, backgroundColor: 'white'}}>
                  <Text>Pengeluaran : {v.beban_id}</Text>
                  <Text>Deskripsi : {v.deskripsi}</Text>
                  <Text>
                    subtotal_pengeluaran : Rp.{v.subtotal_pengeluaran}
                  </Text>
                </View>
              );
            })}
          </View>
        </Modal>
      </View>
    );
  }
}

export default Pengeluaran;
