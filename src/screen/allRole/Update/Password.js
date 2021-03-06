import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import styles from '../../../assets/style/boxAllRole/boxUpdate/Update';

export class Password extends Component {
  constructor() {
    super();
    this.state = {
      new_password: '',
      password: '',
      new_password_confirmation: '',
      token: '',
      loading: false,
      lihat: true,
      lihat1: true,
      lihat2: true,
      role: '',
    };
  }
  EditProfil = () => {
    const {
      password,
      new_password_confirmation,
      new_password,
      role,
    } = this.state;
    const url =
      'https://katastima-pos.herokuapp.com/api/profile/change-password';
    const data = {
      new_password: new_password,
      new_password_confirmation: new_password_confirmation,
      password: password,
    };
    this.setState({loading: true});

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        const {message} = resJson;
        if (message == 'Your password has been change') {
          ToastAndroid.show(
            ' Password Berasil Di Ubah',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson),
          );
          this.setState({loading: false});
          if (role == 'kasir') {
            console.log(role, 'masuk ke aplikasi');
            this.props.navigation.replace('Rumah');
          } else if (role == 'staf') {
            console.log(role, 'masuk ke aplikasi');
            this.props.navigation.replace('Rumah3');
          } else if (role == 'member') {
            console.log(role, 'masuk ke aplikasi');
            this.props.navigation.replace('Rumah1');
          } else if (role == 'pemimpin') {
            console.log(role, 'masuk ke aplikasi');
            this.props.navigation.replace('Rumah4');
          } else if (role == 'admin') {
            console.log(role, 'masuk ke aplikasi');
            this.props.navigation.replace('admin');
          } else {
            console.log('anda orang asing masuk ke aplikasi');
          }
        } else {
          this.setState({loading: false});
          console.log('error');
          alert('error');
        }
      })
      .catch((error) => {
        console.log('error nya adalah ' + error);
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        AsyncStorage.getItem('role').then((role) => {
          console.log('Upadate Password ', role);
          this.setState({role: role});
        });
      } else {
        console.log('tidak ada token');
      }
    });
  }

  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.boxDataInput}>
          <Text style={styles.taksTitle}>Password suwe</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              style={styles.input}
              secureTextEntry={this.state.lihat}
              onChangeText={(taks) => this.setState({password: taks})}
            />
            <View style={styles.boxIcon}>
              <Text onPress={() => this.setState({lihat: !this.state.lihat})}>
                saya
              </Text>
            </View>
          </View>
          <Text style={styles.taksTitle}>Password baru</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              style={styles.input}
              secureTextEntry={this.state.lihat1}
              onChangeText={(taks) => this.setState({new_password: taks})}
            />

            <View style={styles.boxIcon}>
              <Text onPress={() => this.setState({lihat1: !this.state.lihat1})}>
                saya
              </Text>
            </View>
          </View>
          <Text style={styles.taksTitle}>Convirmasi Password</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              style={styles.input}
              secureTextEntry={this.state.lihat2}
              onChangeText={(taks) =>
                this.setState({new_password_confirmation: taks})
              }
            />

            <View style={styles.boxIcon}>
              <Text onPress={() => this.setState({lihat2: !this.state.lihat2})}>
                saya
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.tombol}>
          {this.state.loading ? (
            <ActivityIndicator size={30} color="white" />
          ) : (
            <TouchableNativeFeedback onPress={() => this.EditProfil()}>
              <Text style={styles.taksTombol}>Ubah Password</Text>
            </TouchableNativeFeedback>
          )}
        </View>
      </View>
    );
  }
}

export default Password;
