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
} from 'react-native';
import styles from '../../assets/style/boxPimpinan/index';
export class Lstok extends Component {
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
      dataBulan: [],
      loading: false,
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
    this.Laba();
  };
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
  Laba() {
    console.log('Laporan Laba - Rugi ');
    const {token, tanggal} = this.state;

    const url = `https://katastima-pos.herokuapp.com/api/pimpinan/laporan/laba_rugi/${tanggal}`;
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
          this.setState({dataBulan: resPon.data.transaksi});
          console.log('ini respon if :', resPon.data.transaksi);
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
  Penjualan = () => {
    if (this.state.dataBulan[0].bulan != null) {
      console.log('ini perTahun');
      return (
        <View>
          {this.state.dataBulan.map((val, key) => {
            return (
              <View key={key}>
                <TouchableNativeFeedback>
                  <View style={styles.boxDataMap}>
                    <Text>{'Bulan : ' + val.bulan}</Text>
                    <Text>{'Jumlah Penjulan : ' + val.jumlah_penjualan}</Text>
                    <Text>{'Total Penjulan : Rp.' + val.total_penjualan}</Text>

                    <Text>{'Jumlah Pembelian : ' + val.jumlah_pembelian}</Text>
                    <Text>{'Total Pembelian : Rp.' + val.total_pembelian}</Text>
                    <Text>
                      {'Jumlah Pengeluaran : ' + val.jumlah_pengeluaran}
                    </Text>
                    <Text>
                      {'Total Pengeluaran : Rp.' + val.total_pengeluaran}
                    </Text>

                    <Text>{'Total Laba - Rugi : Rp.' + val.laba_rugi}</Text>
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
          {this.state.dataBulan.map((val, key) => {
            return (
              <View key={key}>
                <TouchableNativeFeedback
                  onPress={() =>
                    this.setState({
                      modal: true,
                      dataDetail: val.pembelian_per_hari,
                    })
                  }>
                  <View style={styles.boxDataMap}>
                    <Text>{'Mingggu ke : ' + val.minggu_ke}</Text>
                    <Text>{'Jumlah Penjualan : ' + val.jumlah_penjualan}</Text>
                    <Text>{'Total Penjulan : Rp.' + val.total_penjualan}</Text>
                    <Text>{'Jumlah Pembelian : ' + val.jumlah_pembelian}</Text>
                    <Text>{'Total Pembelian : Rp.' + val.total_pembelian}</Text>
                    <Text>
                      {'Jumlah Pengeluaran : ' + val.jumlah_pengeluaran}
                    </Text>

                    <Text>
                      {'Total Pengeluaran : Rp.' + val.total_pengeluaran}
                    </Text>
                    <Text>{'Total laba - rugi  : Rp.' + val.laba_rugi}</Text>
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
          <TouchableNativeFeedback onPress={() => this.Laba()}>
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
              {this.state.dataBulan.length == 0 ? (
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
      </View>
    );
  }
}

export default Lstok;
