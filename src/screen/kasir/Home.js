import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
  Modal,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import styles from '../../assets/style/boxKasir/boxHomeKasir/index';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      dataBarang: [],
      dataMember: [],
      loading: false,
      loading1: false,
      data: '',
      data1: '',
      dataKosong: [],
      modalMember: false,
      modalPembanyaran: false,
      token: '',
      penjualan_id: '',
      member_id: '',
      jenis_pembayaran: 'tunai',
      dibayar: '',
      pesan: '',
      dataPembanyaran: '',
      jumlah: '',
      modal: false,
      modalError: false,
    };
  }
  Member = () => {
    return (
      <View style={styles.boxDataMember}>
        <View style={styles.dataMember}>
          <Text>Nama : </Text>
          <Text> Rais azaria </Text>
        </View>
        <View style={styles.dataMember}>
          <Text>Alamat : </Text>
          <Text> DI Yogyakarta </Text>
        </View>
        <View style={styles.dataMember}>
          <Text>Email : </Text>
          <Text> email@gmail.com </Text>
        </View>
        <View style={styles.dataMember}>
          <Text>Saldo : </Text>
          <Text> Rp.1.000.000,- </Text>
        </View>
        <View style={styles.dataMember}>
          <Text>Diskon : </Text>
          <Text> 10 % </Text>
        </View>
        <TouchableNativeFeedback
          onPress={() => this.setState({dataMember: this.state.dataKosong})}>
          <Image
            style={{
              ...styles.Icon,
              margin: 10,
              backgroundColor: 'red',
            }}
            source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
          />
        </TouchableNativeFeedback>
      </View>
    );
  };
  Barang = () => {
    return (
      <View>
        {this.state.dataBarang.map((val, key) => {
          return (
            <View style={{flexDirection: 'row'}} key={key}>
              <View style={styles.dataBarang}>
                <Text> {val.id} </Text>
              </View>
              <View style={styles.dataBarang}>
                <Text> {val.nama}</Text>
              </View>
              <View style={styles.dataBarang}>
                <Text> {val.harga_jual}</Text>
              </View>
              <View style={styles.dataBarang}>
                <Text> {val.quantity} </Text>
              </View>
              <View style={styles.dataBarang}>
                <Text> {val.subtotal_harga} </Text>
              </View>
            </View>
          );
        })}
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text> Total : </Text>
          <Text>{'Rp.' + this.state.jumlah}</Text>
        </View>
      </View>
    );
  };
  GetPenjualan = () => {
    console.log('mulai penjualan');
    const {token} = this.state;
    const url = `https://katastima-pos.herokuapp.com/api/kasir/penjualan/form`;
    this.setState({loading1: true});

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
        const {data} = resjson;
        this.setState({
          penjualan_id: data.id,
          dataBarang: data.detail_penjualan,
          loading1: false,
          jumlah: data.total_price,
        });

        console.log('barang ', resjson);
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading1: false, dataInput: this.state.kosong});
      });
  };
  Pembanyaran = () => {
    console.log('mulai pembanyaran');
    const {
      token,
      penjualan_id,
      member_id,
      jenis_pembayaran,
      dibayar,
    } = this.state;
    const url =
      'https://katastima-pos.herokuapp.com/api/kasir/penjualan/finish';
    const data = {
      penjualan_id: penjualan_id,
      jenis_pembayaran: jenis_pembayaran,
      dibayar: dibayar,
    };
    this.setState({loading1: true});
    member_id != '' ? (data.member_id = member_id) : null;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'applicetion/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resjson) => {
        const {status, error} = resjson;
        if (status == 'success') {
          console.log('ini res pon bersil', resjson);
          this.setState({
            dataPembanyaran: resjson.data,
            modalPembanyaran: true,
            loading1: false,
          });
          ToastAndroid.show(
            ' Transaksi Berasil ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else if (status == 'failed' && error) {
          console.log('orang kere ', resjson);
          this.setState({
            pesan: resjson.message,
            modalError: true,
            loading1: false,
          });
          ToastAndroid.show(
            ' Uang anda tidak Cukup ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          console.log(' ini ada kesalahan ', resjson);
          this.setState({loading1: false});
        }
      })
      .catch((error) => {
        this.setState({loading1: false});
        console.log('error adalah ' + error);
      });
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        console.log(this.state.token);
      } else {
        console.log('tidak ada token');
      }
    });
  }

  render() {
    const {dataPembanyaran, jenis_pembayaran, dibayar} = this.state;
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
        {this.state.penjualan_id == '' ? (
          <View style={{...styles.boxInputMember, alignSelf: 'center'}}>
            <TouchableNativeFeedback onPress={() => this.GetPenjualan()}>
              <Text style={{fontSize: 20, color: 'white', padding: 5}}>
                Mulai Penjualan
              </Text>
            </TouchableNativeFeedback>
          </View>
        ) : (
          <ScrollView style={styles.utama}>
            <View style={{...styles.boxInputMember, alignSelf: 'center'}}>
              {this.state.loading ? (
                <ActivityIndicator size={30} color="white" />
              ) : (
                <TouchableNativeFeedback
                  onPress={() =>
                    this.props.navigation.navigate('Cari', {
                      id: this.state.penjualan_id,
                    })
                  }>
                  <Text style={{fontSize: 20, color: 'white', padding: 5}}>
                    Pencarian Barang
                  </Text>
                </TouchableNativeFeedback>
              )}
            </View>
            <ScrollView>
              {this.state.dataBarang == '' ? (
                <View></View>
              ) : (
                <View>{this.Barang()}</View>
              )}
            </ScrollView>
            <View style={{flexDirection: 'row', padding: 5}}></View>
            <View style={styles.boxInputMember}>
              <TextInput
                placeholder="Member"
                onChangeText={(taks) =>
                  this.setState({
                    data: taks,
                  })
                }
              />
              <TouchableNativeFeedback
                onPress={() => this.setState({modalMember: true})}>
                <Image
                  style={{...styles.Icon, margin: 10}}
                  source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
                />
              </TouchableNativeFeedback>
            </View>
            {this.state.dataMember == '' ? (
              <View></View>
            ) : (
              <View>{this.Member()}</View>
            )}

            <View style={styles.klikBayar}>
              <TouchableNativeFeedback
                onPress={() => this.setState({modal: true})}>
                {this.state.loading1 ? (
                  <ActivityIndicator size={30} color="white" />
                ) : (
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                      padding: 5,
                    }}>
                    Pembanyaran
                  </Text>
                )}
              </TouchableNativeFeedback>
            </View>
          </ScrollView>
        )}
        <Modal
          visible={this.state.modalMember}
          animationType="fade"
          onRequestClose={() => this.setState({modalMember: false})}
          transparent>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            {this.Member()}
          </View>
        </Modal>
        <Modal
          visible={this.state.modalPembanyaran}
          animationType="fade"
          onRequestClose={() => this.setState({modalPembanyaran: false})}
          transparent>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text>{'total : Rp. ' + dataPembanyaran.total_price}</Text>
            <Text>
              {'jenis pembayaran : ' + dataPembanyaran.jenis_pembayaran}
            </Text>
            <Text>{'Uang : Rp. ' + dataPembanyaran.dibayar}</Text>
            <Text>{'kembalian : Rp. ' + dataPembanyaran.kembalian}</Text>
          </View>
        </Modal>
        <Modal
          visible={this.state.modal}
          animationType="fade"
          onRequestClose={() => this.setState({modal: false})}
          transparent>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <TouchableNativeFeedback
                onPress={() => this.setState({jenis_pembayaran: 'tunai'})}>
                <View
                  style={{
                    margin: 10,
                    backgroundColor: 'blue',
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <Text style={{fontSize: 20, color: 'white'}}>Tunai</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => this.setState({jenis_pembayaran: 'debit'})}>
                <View
                  style={{
                    margin: 10,
                    backgroundColor: 'blue',
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <Text style={{fontSize: 20, color: 'white'}}>Debit</Text>
                </View>
              </TouchableNativeFeedback>
            </View>

            <TextInput
              placeholder="apap"
              onChangeText={(taks) => this.setState({dibayar: taks})}
              keyboardType="number-pad"
            />
            <View style={styles.klikBayar}>
              <TouchableNativeFeedback onPress={() => this.Pembanyaran()}>
                {this.state.loading1 ? (
                  <ActivityIndicator size={30} color="white" />
                ) : (
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                      padding: 5,
                    }}>
                    Bayar
                  </Text>
                )}
              </TouchableNativeFeedback>
            </View>
          </View>
        </Modal>
        <Modal
          visible={this.state.modalError}
          animationType="fade"
          onRequestClose={() => this.setState({modalError: false})}
          transparent>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text> {this.state.pesan}</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Home;
