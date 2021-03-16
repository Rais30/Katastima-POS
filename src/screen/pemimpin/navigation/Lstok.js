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
import styles from '../../../assets/style/boxPimpinan/index';
export class Lstok extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
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

      tanggal: '',
      dataStok: [],
      laporan: '',
      dataKeluar: [],
      dataMasuk: [],
      modal: false,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        console.log(token);
        this.setState({token: token});
        this.ShowCurrentDate();
      } else {
        console.log('tidak ada');
      }
    });
  }
  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();

    this.setState({
      tanggal: `${month < 10 ? '0' + month : month}-${year}`,
    });
    this.GetStok();
  };
  GetStok = () => {
    console.log('Get stok');
    const {token, tanggal} = this.state;
    const url = `https://katastima-pos.herokuapp.com/api/pimpinan/laporan/stok_barang/2021`;
    // this.setstate({loading: true});

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((respon) => {
        console.log(respon);
        const {status, laporan, data} = respon;
        if (status == 'success' && laporan == 'hari') {
          console.log('ini laportan harian', data, laporan);
          this.setState({
            dataKeluar: data.stok_keluar,
            laporan: laporan,
            dataMasuk: data.stok_masuk,
          });
        } else if (
          status == 'success' &&
          (laporan == 'tahun' || laporan == 'bulan')
        ) {
          console.log('ini laportan tahunan', data, laporan);
          this.setState({dataStok: data, laporan: laporan});
        }
      })
      .catch((error) => {
        console.log('ini respon dari error : ', error);
      });
  };
  Stok = (laporan) => {
    if (laporan == 'tahun') {
      console.log('ini laportan tahunan');
      return (
        <ScrollView style={{flex: 1}}>
          {this.state.dataStok.map((val, key) => {
            return (
              <View key={key}>
                <Text>Bulan : {val.bulan}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableNativeFeedback
                    onPress={() =>
                      this.setState({dataMasuk: val.stok_masuk, modal: true})
                    }>
                    <View
                      style={{
                        backgroundColor: 'blue',
                        borderRadius: 5,
                        padding: 3,
                      }}>
                      <Text style={{fontSize: 15, color: 'white'}}>
                        Stok Masuk
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                    onPress={() =>
                      this.setState({dataMasuk: val.stok_keluar, modal: true})
                    }>
                    <View
                      style={{
                        backgroundColor: 'red',
                        borderRadius: 5,
                        padding: 3,
                      }}>
                      <Text style={{fontSize: 15, color: 'white'}}>
                        Stok Keluar
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            );
          })}
        </ScrollView>
      );
    } else if (laporan == 'bulan') {
      console.log('ini laporan bulanan');
      return (
        <ScrollView style={{flex: 1}}>
          {this.state.dataStok.map((val, key) => {
            return (
              <View key={key}>
                <Text>Minggu Ke : {val.minggu_ke}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableNativeFeedback
                    onPress={() =>
                      this.setState({dataMasuk: val.stok_masuk, modal: true})
                    }>
                    <View
                      style={{
                        backgroundColor: 'blue',
                        borderRadius: 5,
                        padding: 3,
                      }}>
                      <Text style={{fontSize: 15, color: 'white'}}>
                        Stok Masuk
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                    onPress={() =>
                      this.setState({dataMasuk: val.stok_keluar, modal: true})
                    }>
                    <View
                      style={{
                        backgroundColor: 'red',
                        borderRadius: 5,
                        padding: 3,
                      }}>
                      <Text style={{fontSize: 15, color: 'white'}}>
                        Stok Keluar
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>
            );
          })}
        </ScrollView>
      );
    } else if (laporan == 'hari') {
      console.log('ini laporan harian');
      return (
        <ScrollView style={{flex: 1}}>
          <View
            style={{backgroundColor: 'blue', alignItems: 'center', padding: 5}}>
            <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>
              Stok Keluar
            </Text>
          </View>
          <View>
            {this.state.dataKeluar.length == 0 ? (
              <Text> data tidak ada</Text>
            ) : (
              <>
                {this.state.dataKeluar.map((val, key) => {
                  <View key={key}>
                    <Text>Barang : {val.nama_produk}</Text>
                    <Text>Jumlah : {val.total_keluar}</Text>
                  </View>;
                })}
              </>
            )}
          </View>
          <View
            style={{backgroundColor: 'blue', alignItems: 'center', padding: 5}}>
            <Text style={{fontSize: 17, color: 'white', fontWeight: 'bold'}}>
              Stok Masuk
            </Text>
          </View>
          <View>
            {this.state.dataMasuk.length == 0 ? (
              <Text> data tidak ada</Text>
            ) : (
              <Text>
                {this.state.dataMasuk.map((val, key) => {
                  <View key={key}>
                    <Text>Barang : {val.nama_produk}</Text>
                    <Text>Jumlah : {val.total_masuk}</Text>
                  </View>;
                })}
              </Text>
            )}
          </View>
        </ScrollView>
      );
    } else {
      console.log(' ini respon else Get stok :');
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
          <TouchableNativeFeedback onPress={() => this.GetStok()}>
            <Image
              style={styles.Icon}
              source={require('../../../assets/logoAplikasi/pngaaa.com-607749.png')}
            />
          </TouchableNativeFeedback>
        </View>
        {this.state.loading ? (
          <ActivityIndicator size={35} color="red" />
        ) : (
          <>
            {this.state.dataStok.length == 0 ? (
              <Text> Data tidak ada </Text>
            ) : (
              <View>{this.Stok(this.state.laporan)}</View>
            )}
          </>
        )}
        <Modal
          visible={this.state.modal}
          animationType="slide"
          onRequestClose={() => this.setState({modal: false})}
          transparent>
          <View style={{backgroundColor: 'white', padding: 5, flex: 1}}>
            <ScrollView>
              <View>
                {this.state.dataKeluar.length == 0 ? (
                  <View></View>
                ) : (
                  <>
                    <View
                      style={{
                        backgroundColor: 'blue',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Stok Keluar
                      </Text>
                    </View>
                    {this.state.dataKeluar.map((val, key) => {
                      <View key={key}>
                        <Text>Barang : {val.nama_produk}</Text>
                        <Text>Jumlah : {val.total_keluar}</Text>
                      </View>;
                    })}
                  </>
                )}
              </View>

              <View>
                {this.state.dataMasuk.length == 0 ? (
                  <View></View>
                ) : (
                  <View>
                    <View
                      style={{
                        backgroundColor: 'blue',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: 'white',
                          fontWeight: 'bold',
                        }}>
                        Stok Masuk
                      </Text>
                    </View>
                    <Text>
                      {this.state.dataMasuk.map((val, key) => {
                        <View key={key}>
                          <Text>Barang : {val.nama_produk}</Text>
                          <Text>Jumlah : {val.total_masuk}</Text>
                        </View>;
                      })}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Lstok;
