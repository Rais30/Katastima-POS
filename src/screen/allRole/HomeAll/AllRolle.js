import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import styles from '../../../assets/style/boxAllRole/HomeAll/boxAllRolle';
export class AllRolle extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
      Rolle: 0,
    };
  }
  alert() {
    Alert.alert(
      '',
      'Mohon di Tunggo Confirmasi dari Server',
      [
        {
          text: 'Convirmation',
          cancelable: false,
        },
      ],
      {cancelable: false},
    );
  }
  alert1() {
    Alert.alert(
      '',
      'Apa pilihan Anda sudah sesuali ( Plihan anda TIDAK dapat di UBAH !!! )',
      [
        {
          text: 'Convirmation',
          onPress: () => this.GetRolle(),
        },
        {
          text: 'Tutup',
        },
      ],
      {cancelable: false},
    );
  }
  LogOut = () => {
    AsyncStorage.clear();
    this.props.navigation.replace('Splash');
  };
  GetRolle = () => {
    const {token, Rolle} = this.state;
    const url = `https://katastima-pos.herokuapp.com/api/Profile/request-role/${Rolle}`;
    this.setState({loading: true});
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
        console.log(resjson);
        const {status} = resjson;
        if (status == 'success') {
          ToastAndroid.show(
            ' Permintaan anda Akan Kami Proses Harap Tunggu',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({loading: false});
        } else if (status == 'failed') {
          this.setState({loading: false});
          this.alert();
        } else {
          this.setState({loading: false});
          ToastAndroid.show(
            ' Periksa Kembali Jaringan Internet Anda',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch((err) => {
        console.log('ini ada error ', err);
      });
  };
  GetAdmin = () => {
    const {token} = this.state;
    const url = `https://katastima-pos.herokuapp.com/api/Profile/set-self-as-admin`;
    this.setState({loading: true});
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
        console.log(resjson);
        const {status, data} = resjson;
        if (status == 'success') {
          AsyncStorage.setItem('role', data.role);
          this.setState({loading: false});
          ToastAndroid.show(
            ' Selamt datang Di Toko Baru Anda',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.replace('Splash');
        } else {
          this.setState({loading: false});
          ToastAndroid.show(
            ' Periksa Kembali Jaringan Internet Anda',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch((err) => {
        console.log('ini ada error ', err);
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log('token ada : ' + token);
      } else {
        console.log('anda tidak memiliki token');
      }
    });
  }
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headher}>
          <Image
            source={require('../../../assets/logoAplikasi/pngaaa.com-607749.png')}
            style={styles.Icon}
          />

          <Text style={styles.taksIcon}>atastima</Text>
        </View>
        <View style={{...styles.sty, margin: 20}}>
          <View style={styles.tombol}>
            <TouchableNativeFeedback
              onPress={() => {
                this.alert1();
                this.setState({Rolle: 3});
              }}>
              <Text style={styles.taksTom}> Kasir</Text>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.tombol}>
            <TouchableNativeFeedback
              onPress={() => {
                this.alert1();
                this.setState({Rolle: 4});
              }}>
              <Text style={styles.taksTom}> Staff</Text>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View
          style={{
            ...styles.tombol,
            margin: 10,
            alignSelf: 'center',
            paddingHorizontal: 100,
          }}>
          <TouchableNativeFeedback onPress={() => this.GetAdmin()}>
            <Text style={styles.taksTom}> Buka Toko</Text>
          </TouchableNativeFeedback>
        </View>
        {this.state.loading ? (
          <ActivityIndicator size={35} color="red" />
        ) : (
          <View></View>
        )}
        <View
          style={{
            ...styles.tombol,
            margin: 10,
            alignSelf: 'center',
            paddingHorizontal: 100,
            backgroundColor: 'red',
          }}>
          <TouchableNativeFeedback onPress={() => this.LogOut()}>
            <Text style={styles.taksTom}> Log Out</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

export default AllRolle;
