import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import styles from '../../assets/style/boxAllRole/boxAutentikasi/boxAutentivikasi';

export class RegisMember extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
      nama: '',
      saldo: '',
      no_telephone: '',
      modal: false,
      data: {},
    };
  }
  Register = () => {
    const {nama, saldo, no_telephone, token} = this.state;
    const url = 'https://katastima-pos.herokuapp.com/api/kasir/member/create';
    const data = {
      nama: nama,
      saldo: saldo,
      no_telephone: no_telephone,
    };
    this.setState({loading: true});
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
      .then((resJson) => {
        console.log('ini member baru');
        const {status, data} = resJson;
        if (status == 'success') {
          this.setState({loading: false});
          ToastAndroid.show(
            ' Member Berasil Terdaftar',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({data: data});
          console.log('ini data Member : ', this.state.data);
          this.setState({modal: true});
        } else {
          this.setState({loading: false});
          console.log('ini respon nya : ', resJson);
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('error adalah ' + error);
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        console.log(token);
        this.setState({token: token});
      } else {
        console.log('no token');
      }
    });
  }
  render() {
    const {data} = this.state;
    return (
      <View style={styles.utama}>
        <ScrollView>
          <View style={styles.headher}>
            <Image
              style={styles.gambar}
              source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
            />
          </View>
          <View style={styles.body}>
            <View style={{...styles.boxInput, marginTop: 80}}>
              <TextInput
                style={styles.input}
                placeholder="Nama"
                onChangeText={(taks) => this.setState({nama: taks})}
              />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="saldo"
                onChangeText={(taks) => this.setState({saldo: taks})}
              />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="No Telephone"
                keyboardType="number-pad"
                onChangeText={(taks) => this.setState({no_telephone: taks})}
              />
            </View>

            <TouchableNativeFeedback onPress={() => this.Register()}>
              <View style={styles.tombol}>
                {this.state.loading ? (
                  <ActivityIndicator size={25} color="white" />
                ) : (
                  <Text style={styles.teksTombol}>Daftar</Text>
                )}
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
        <Modal
          transparent
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: false})}>
          <View
            style={{
              ...styles.utama,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.modal}>
              <Text>{'Kode : ' + data.kode_member}</Text>
              <Text>{'Nama : ' + data.nama}</Text>
              <Text>{'No Telephone : ' + data.no_telephone}</Text>
              <Text>{'Saldo : ' + data.saldo}</Text>
            </View>
          </View>
        </Modal>
      </View>
      // <View>
      //   <Text> ini register member</Text>
      // </View>
    );
  }
}

export default RegisMember;
