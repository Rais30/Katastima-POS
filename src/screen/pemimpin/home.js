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
    console.log('Laporan Absensi Shift');
    const {token, tanggal} = this.state;

    const url = `https://katastima-pos.herokuapp.com/api/pimpinan/laporan/absensi_kasir/${tanggal}`;
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
          this.setState({dataShift: resPon.data.shift});
          console.log('ini ada Absensi :', resPon.data.shift);
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
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headher}>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
              style={styles.Icon}
            />
          </TouchableNativeFeedback>
          <Text style={styles.taksIcon}> atastima</Text>
        </View>
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
                <View>
                  {this.state.dataShift.map((val, key) => {
                    return (
                      <View key={key}>
                        <TouchableNativeFeedback>
                          <View style={styles.boxDataMap}>
                            <Text>{'Nama : ' + val.nama_kasir}</Text>
                            <Text>{'Tanggal : ' + val.tanggal}</Text>
                            <Text>{'Mulai Shift : ' + val.start_time}</Text>
                            <Text>{'Akhir Shift : ' + val.end_time}</Text>
                            <View style={styles.sty}>
                              <Text>
                                {'Barang :' + val.transaction_on_shift}
                              </Text>
                              <Text>
                                {'Pemeblian : Rp.' +
                                  val.total_penjualan_on_shift}
                              </Text>
                            </View>
                          </View>
                        </TouchableNativeFeedback>
                      </View>
                    );
                  })}
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Home;
