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
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles1 from '../../assets/style/boxAllRole/boxCari/boxCari';
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
      staff_id: '',
      jenis_pembayaran: 'tunai',
      dibayar: '',
      pesan: '',
      dataPembanyaran: '',
      jumlah: '',
      modal: false,
      modalError: false,
      dataInput: '',
      namaMember: '',
      saldoMember: '',
      alamatStaff: '',
      jBarang: 0,
      idBarang: '',
      penjualan_id: '',
      hargaBeli: '',
      dataMap: [],
      Inputbarang: '',
      modalstaf: false,
      kondisi: true,
      dataBarang1: [],
      hargajual: '',
    };
  }
  alert() {
    Alert.alert(
      '',
      `Apakah anda ingin melakukan Transaksik dengan Supplaiyer ini : `,
      [
        {
          text: 'Iya',
          onPress: () => this.GetPenjualan(),
        },
        {
          text: 'Tutup',
        },
      ],
      {cancelable: false},
    );
  }
  Member = () => {
    if (this.state.staff_id != null) {
      return (
        <View>
          <View>
            <View style={styles.boxDataMap}>
              <Text>{'Nama : ' + this.state.namaMember}</Text>
              <Text>{'No Telephone : ' + this.state.saldoMember}</Text>
              <Text>{'Alamat : ' + this.state.alamatStaff}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  };
  Barang = () => {
    return (
      <View style={{margin: 10, padding: 10}}>
        {this.state.dataBarang.map((val, key) => {
          return (
            <View style={{flexDirection: 'row'}} key={key}>
              <View style={styles.dataBarang}>
                <Text> {val.nama_product}</Text>
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
              <View style={styles.dataBarang}>
                <TouchableNativeFeedback onPress={() => this.Hapus(val.id)}>
                  <Text> Hapus </Text>
                </TouchableNativeFeedback>
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
  GetPenjualan() {
    console.log('mulai penjualan');

    const {token, staff_id} = this.state;
    const q = staff_id !== '' ? `/${staff_id}` : '';
    const url = `https://katastima-pos.herokuapp.com/api/staff/pembelian/form${q}`;
    this.setState({loading: true});
    console.log('ini id staff : ', staff_id);

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resjson) => {
        const {status, data} = resjson;
        if (status == 'success') {
          console.log('memmulai tambah stok berasil ', resjson);
          this.setState({
            loading: false,
            kondisi: false,
            penjualan_id: data.id,
            modalMember: false,
          });
        } else {
          console.log('memmulai tambah stok gagal ', resjson);
          this.setState({loading: false, modalMember: true});
          this.CariMember();
        }
      })
      .catch((error) => {
        console.log('ini ada error Get Staff', error);
        // this.setState({loading: false, dataInput: this.state.kosong});
      });
  }
  Pembanyaran = () => {
    console.log('mulai pembanyaran');
    const {token, penjualan_id} = this.state;
    const url =
      'https://katastima-pos.herokuapp.com/api/staff/pembelian/finish';
    const data = {
      pembelian_id: penjualan_id,
    };
    this.setState({loading1: true});

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
            modal: false,
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
  CariMember() {
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
        this.setState({dataMember: resjson, loading: false});
        console.log('ini respon cari member ', resjson);
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading: false, dataInput: this.state.kosong});
      });
  }
  componentDidMount() {
    console.log('ini dataMap : ', this.state.dataMap);
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        console.log(this.state.token);
      } else {
        console.log('tidak ada token');
      }
    });
  }
  TambahBatang = () => {
    console.log('get  barang');
    const {
      token,
      jBarang,
      idBarang,
      penjualan_id,
      hargaBeli,
      hargajual,
    } = this.state;

    const data = {
      pembelian_id: penjualan_id,
      product_id: idBarang,
      quantity: jBarang,
      harga_beli: hargaBeli,
      harga_jual: hargajual,
    };
    console.log(penjualan_id);
    const url = `https://katastima-pos.herokuapp.com/api/staff/pembelian/create-detail`;
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
        const {kode_transaksi, detail_pembelian, total_price} = resjson;
        if (kode_transaksi != null) {
          console.log('ini respon : ', resjson);
          this.setState({
            loading1: false,
            modalstaf: false,
            dataBarang: detail_pembelian,
            jumlah: total_price,
          });
        } else {
          console.log('ini adalah res tambah Barang nya : ', resjson);
          this.setState({loading1: false, modalstaf: false});
        }
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading1: false, modal: false});
      });
  };
  GetBarang = () => {
    console.log('get  barang di staff');
    const {token, Inputbarang} = this.state;
    const q = Inputbarang !== '' ? `/${Inputbarang}` : '';
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
        this.setState({dataMap: resjson.data, loading: false});
        console.log('barang ', resjson.data);
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading: false, dataInput: this.state.kosong});
      });
  };
  Tambah = () => {
    this.setState({jBarang: this.state.jBarang + 1});
  };
  Kurang = () => {
    this.setState({jBarang: this.state.jBarang - 1});
  };
  Hapus = (id) => {
    console.log('Hapus Barang');
    const {token} = this.state;
    const url = `https://katastima-pos.herokuapp.com/api/staff/pembelian/delete-detail/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log('ini respon Dellet', resjson);
        this.GetPenjualan();
      })
      .catch((error) => {
        console.log('ini ada error Dellet : ', error);
      });
  };
  render() {
    const {dataPembanyaran} = this.state;
    return (
      <View style={styles.utama}>
        {this.state.kondisi ? (
          <View style={{...styles.boxInputMember, alignSelf: 'center'}}>
            {this.state.loading ? (
              <ActivityIndicator size={30} color="white" />
            ) : (
              <TouchableNativeFeedback onPress={() => this.GetPenjualan()}>
                <Text style={{fontSize: 20, color: 'white', padding: 5}}>
                  Mulai Penjualan
                </Text>
              </TouchableNativeFeedback>
            )}
          </View>
        ) : (
          <ScrollView style={styles.utama}>
            <View style={{...styles.boxInputMember, alignSelf: 'center'}}>
              {this.state.loading ? (
                <ActivityIndicator size={30} color="white" />
              ) : (
                <TouchableNativeFeedback
                  onPress={() => this.setState({modalError: true})}>
                  <Text style={{fontSize: 20, color: 'white', padding: 5}}>
                    Pencarian Barang
                  </Text>
                </TouchableNativeFeedback>
              )}
            </View>
            <ScrollView horizontal>
              {this.state.dataBarang == '' ? (
                <View></View>
              ) : (
                <View>{this.Barang()}</View>
              )}
            </ScrollView>
            <View style={{flexDirection: 'row', padding: 5}}></View>

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
            <View style={styles1.boxInput}>
              <TextInput
                style={{flex: 1}}
                placeholder="Member"
                onChangeText={(taks) => this.setState({dataInput: taks})}
              />
              <TouchableOpacity onPress={(taks) => this.CariMember()}>
                <Image
                  source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
                  style={styles1.Icon}
                />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {this.state.dataMember == [] ? (
                <View>
                  {loading ? (
                    <View></View>
                  ) : (
                    <ActivityIndicator size={50} color="red" />
                  )}
                </View>
              ) : (
                <View>
                  {this.state.dataMember.map((val, key) => {
                    return (
                      <View key={key}>
                        <TouchableNativeFeedback
                          onPress={() => {
                            this.setState({
                              staff_id: val.id,
                              namaMember: val.nama_supplier,
                              saldoMember: val.telepon_supplier,
                              alamatStaff: val.alamat_supplier,
                            });
                            this.alert();
                          }}>
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
                    Banyar
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
            <View style={styles1.boxInput}>
              <TextInput
                style={{flex: 1}}
                placeholder="Barang"
                onChangeText={(taks) => this.setState({Inputbarang: taks})}
              />
              <TouchableOpacity onPress={() => this.GetBarang()}>
                <Image
                  source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
                  style={styles1.Icon}
                />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {this.state.dataMap.length == 0 ? (
                <View></View>
              ) : (
                <View>
                  {this.state.dataMap.map((val, key) => {
                    return (
                      <View key={key}>
                        <TouchableNativeFeedback
                          onPress={() =>
                            this.setState({modalstaf: true, idBarang: val.id})
                          }>
                          <View style={styles.boxDataMap}>
                            <Text>{'Kode Barang : ' + val.UID}</Text>
                            <Text>{'nama : ' + val.nama}</Text>
                            <Text>{'merek : ' + val.merek}</Text>
                            <Text>{'stok : ' + val.stok}</Text>
                            <View style={styles1.sty}>
                              <Text>{'harga : Rp.' + val.harga_jual}</Text>
                              <Text>{'diskon : ' + val.diskon + '%'}</Text>
                            </View>
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
        <Modal
          visible={this.state.modalstaf}
          transparent
          animationType="slide"
          onRequestClose={() => this.setState({modalstaf: false})}>
          <View
            style={{
              ...styles1.utama,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles1.modal}>
              <View style={{...styles1.sty, justifyContent: 'space-between'}}>
                <Text> Jumlah Barang : </Text>
                <Text>{this.state.jBarang}</Text>
              </View>
              <View style={styles1.sty}>
                <TouchableOpacity
                  onPress={() => this.Tambah()}
                  style={{...styles1.tombol, backgroundColor: 'green'}}>
                  <Text>T</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.Kurang()}
                  style={{...styles1.tombol, backgroundColor: 'red'}}>
                  <Text>K</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TextInput
                  placeholder="harga beli"
                  onChangeText={(taks) => this.setState({hargaBeli: taks})}
                  keyboardType="number-pad"
                />
              </View>
              <View>
                <TextInput
                  placeholder="harga jual"
                  onChangeText={(taks) => this.setState({hargajual: taks})}
                  keyboardType="number-pad"
                />
              </View>
              <TouchableNativeFeedback onPress={() => this.TambahBatang()}>
                {this.state.loading1 ? (
                  <ActivityIndicator size={30} color="white" />
                ) : (
                  <View style={styles1.tombol}>
                    <Text style={styles1.taksTombol}> Tambah Barang </Text>
                  </View>
                )}
              </TouchableNativeFeedback>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Home;
