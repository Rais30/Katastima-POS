import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  TouchableNativeFeedback,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';

export class Shift extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
      start_time: '',
      end_time: '',
      transaction_on_shift: '',
      total_penjualan_on_shift: '',
      duration: '0',
      kode_kasir: '',
      pesan: '',
    };
  }
  Mulai() {
    const {token, pesan} = this.state;
    const url = 'https://katastima-pos.herokuapp.com/api/kasir/shift/start';
    console.log('Mulai shift');
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        const {status, data, message, error} = resJson;
        if (status == 'success') {
          console.log('Memulai shift (selamat bekerja)');
          console.log('ini respon nya 1 :', resJson);
          this.setState({
            kode_kasir: data.kode_kasir,
            start_time: data.start_time,
            end_time: data.end_time,
            transaction_on_shift: data.transaction_on_shift,
            duration: '',
          });
          ToastAndroid.show(
            'Anda sudah memulai shift kerja anda',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({loading: false});
        } else if (status == 'failed') {
          console.log('Cui belum waktu pulang ');
          console.log('ini respon nya 2 :', resJson);

          this.setState({
            pesan: JSON.stringify(error.message[0]),
            kode_kasir: '',
          });
          ToastAndroid.show(
            'Anda saat ini dalam shift',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );

          this.setState({loading: false});
        } else {
          this.setState({loading: false});
          console.log('ini respon nya : ', resJson);
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('ini adalah res pon error nya : ', error);
      });
  }
  Akhir() {
    const {token} = this.state;
    const url = 'https://katastima-pos.herokuapp.com/api/kasir/shift/end';
    console.log('Akhir shift');
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        const {status, data, message, error} = resJson;
        if (status == 'success') {
          console.log('Akhir shift (selamat Pulang bekerja)');
          console.log('ini respon nya 1 :', resJson);
          this.setState({
            kode_kasir: data.kode_kasir,
            start_time: data.start_time,
            end_time: data.end_time,
            transaction_on_shift: data.transaction_on_shift,
            duration: data.duration,
          });
          ToastAndroid.show(
            '"Anda sudah memulai shift kerja anda',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({loading: false});
        } else if (status == 'failed') {
          console.log('Cui belum waktu pulang ');
          console.log('ini respon nya 2 :', resJson);
          this.setState({pesan: error.message[0]});
          ToastAndroid.show(
            'Belum Waktunya pulang kerja',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({loading: false});
        } else {
          this.setState({loading: false});
          console.log('ini respon nya : ', resJson);
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('ini adalah res pon error nya : ', error);
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log('anda di screan Shift');
      } else {
        console.log('tidak ada token di shift');
      }
    });
  }
  DataShift = () => {
    const {
      kode_kasir,
      start_time,
      end_time,
      transaction_on_shift,
      total_penjualan_on_shift,
      duration,
    } = this.state;
    return (
      <View>
        <Text>Kode Kasir : {kode_kasir}</Text>
        <Text>Mulai Shift : {start_time}</Text>
        <Text>Akhir Shift : {end_time}</Text>
        <Text>Transaksi : {transaction_on_shift}</Text>
        <Text>Total Penjualan : {total_penjualan_on_shift}</Text>
        <Text>Durasi Shift : {duration}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headher}></View>
        <ScrollView>
          {this.state.loading ? (
            <ActivityIndicator size={35} color="red" />
          ) : (
            <View style={styles.Posisi}>
              <TouchableNativeFeedback onPress={() => this.Mulai()}>
                <View style={styles.tombol}>
                  <Text style={styles.taks}> Mulai Shift </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={() => this.Akhir()}>
                <View style={{...styles.tombol, backgroundColor: 'red'}}>
                  <Text style={styles.taks}> Akhiri Shift </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
          <View>
            {this.state.kode_kasir == '' ? (
              <View></View>
            ) : (
              <View>{this.DataShift()}</View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Shift;

const styles = StyleSheet.create({
  utama: {
    flex: 1,
  },
  headher: {
    backgroundColor: 'blue',
    height: 50,
    marginBottom: 5,
  },
  tombol: {
    backgroundColor: 'green',
    padding: 8,
  },
  taks: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  Posisi: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
