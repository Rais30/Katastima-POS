import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableNativeFeedback,
  ToastAndroid,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import styles from '../../assets/style/boxStaff/index';
export class Tbarang extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
      modalSupplier: false,
      UID: '',
      merek: '',
      nama: '',
      category_id: '',
      supplier_id: '',
      stok: '',
      harga_beli: '',
      harga_jual: '',
      nameSup: '',
      alamatSup: '',
      NoSup: '',
      dataSup: [],
      Inpt: '',
      diskon: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        console.log('POST barang Baru');
        this.CariMember();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  Member = () => {
    if (this.state.supplier_id != '') {
      // console.log('ini suppleir id nya : ', this.state.supplier_id);
      return (
        <View>
          <View>
            <View style={styles.boxDataMap}>
              <Text>{'Nama : ' + this.state.nameSup}</Text>
              <Text>{'No Telephone : ' + this.state.NoSup}</Text>
              <Text>{'Alamat : ' + this.state.alamatSup}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  };
  CariMember() {
    console.log('get  barang');
    const {token, Inpt} = this.state;
    const q = Inpt !== '' ? `/${Inpt}` : '';
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
        this.setState({dataSup: resjson, loading: false});
        console.log('ini respon cari Suppleir ', resjson);
      })
      .catch((error) => {
        console.log('Suppleir ini ada error', error);
        this.setState({loading: false});
      });
  }
  TambahBatang = () => {
    console.log('Tambah Barang Baru');
    const {
      token,
      UID,
      merek,
      nama,
      category_id,
      supplier_id,
      stok,
      harga_beli,
      harga_jual,
      diskon,
    } = this.state;

    const data = {
      UID: UID,
      merek: merek,
      nama: nama,
      category_id: category_id,
      supplier_id: supplier_id,
      stok: stok,
      harga_beli: harga_beli,
      harga_jual: harga_jual,
      diskon: diskon,
    };
    console.log();
    const url = `https://katastima-pos.herokuapp.com/api/staff/new-product`;
    this.setState({loading: true});
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
        const {kode_transaksi, detail_pembelian, total_price} = resjson;
        if (kode_transaksi != null) {
          console.log('ini respon : ', resjson);
          this.setState({
            loading: false,
          });
          ToastAndroid.show(
            ' Transaksi Berasil ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          console.log('ini adalah res tambah Barang nya : ', resjson);
          this.setState({loading: false});
        }
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading: false});
      });
  };
  render() {
    return (
      <View style={styles.utama}>
        <View
          style={{
            ...styles.headher,
            alignSelf: 'center',
            borderRadius: 10,
            margin: 10,
          }}>
          <Text style={styles.tittel}> Tambah Barang Baru </Text>
        </View>
        <ScrollView>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> UID :</Text>
            <TextInput
              placeholder="Kode Barang"
              onChangeText={(taks) => this.setState({UID: taks})}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Merek :</Text>
            <TextInput
              placeholder="Kode Barang"
              onChangeText={(taks) => this.setState({merek: taks})}
            />
          </View>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Nama :</Text>
            <TextInput
              placeholder="Kode Barang"
              onChangeText={(taks) => this.setState({nama: taks})}
            />
          </View>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Kategori : </Text>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '1'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Alat Tulis</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '2'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Sembako</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '3'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Alat Mandi & Mencuci</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '4'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Makanan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '5'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Minuman</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '6'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Alat Rumah Tangga</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '7'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Obat - obatan </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '8'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Gas Elpiji</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '9'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Keperluan Bayi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({category_id: '10'})}
                style={styles.boxKate}>
                <Text style={styles.taksKate}>Lain - lainnya</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableNativeFeedback
            onPress={() => this.setState({modalSupplier: true})}>
            <View style={styles.boxDataInput}>
              <Text style={styles.font}> Supplier : </Text>
              {this.Member()}
            </View>
          </TouchableNativeFeedback>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Stok :</Text>
            <TextInput
              placeholder="Jumlah Barang"
              onChangeText={(taks) => this.setState({stok: taks})}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Harga Beli :</Text>
            <TextInput
              placeholder="Rp.0,-"
              onChangeText={(taks) => this.setState({harga_beli: taks})}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Harga Jual :</Text>
            <TextInput
              placeholder="Rp.0,-"
              onChangeText={(taks) => this.setState({harga_jual: taks})}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.boxDataInput}>
            <Text style={styles.font}> Diskon :</Text>
            <TextInput
              placeholder=" 0% "
              onChangeText={(taks) => this.setState({diskon: taks})}
              keyboardType="number-pad"
            />
          </View>
          <TouchableNativeFeedback onPress={() => this.TambahBatang()}>
            <View
              style={{
                ...styles.headher,
                alignSelf: 'center',
                borderRadius: 10,
                marginVertical: 30,
              }}>
              <Text style={styles.tittel}> Tambah Barang </Text>
            </View>
          </TouchableNativeFeedback>
        </ScrollView>
        <Modal
          visible={this.state.modalSupplier}
          animationType="fade"
          onRequestClose={() => this.setState({modalSupplier: false})}
          transparent>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={styles.boxInput}>
              <TextInput
                style={{flex: 1}}
                placeholder="Supplier"
                onChangeText={(taks) => this.setState({Inpt: taks})}
              />
              <TouchableOpacity onPress={(taks) => this.CariMember()}>
                <Image.length
                  source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
                  style={styles.Icon}
                />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {this.state.dataSup == 0 ? (
                <View>
                  {this.state.loading ? (
                    <View></View>
                  ) : (
                    <ActivityIndicator size={50} color="red" />
                  )}
                </View>
              ) : (
                <View>
                  {this.state.dataSup.map((val, key) => {
                    return (
                      <View key={key}>
                        <TouchableNativeFeedback
                          onPress={() =>
                            this.setState({
                              supplier_id: val.id,
                              nameSup: val.nama_supplier,
                              NoSup: val.telepon_supplier,
                              alamatSup: val.alamat_supplier,
                            })
                          }>
                          <View style={styles.boxDataMap}>
                            <Text>{'Nama : ' + val.nama_supplier}</Text>
                            <Text>{'Alamat : ' + val.alamat_supplier}</Text>
                            <Text>
                              {'No Telephone : ' + val.telepon_supplier}
                            </Text>
                          </View>
                        </TouchableNativeFeedback>
                      </View>
                    );
                  })}
                </View>
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Tbarang;
