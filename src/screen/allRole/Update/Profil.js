import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  ToastAndroid,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import styles from '../../../assets/style/boxAllRole/boxUpdate/Update';

export class EditProfil extends Component {
  constructor() {
    super();
    this.state = {
      visibel: true,
      name: '',
      email: '',
      alamat: '',
      umur: '',
      profile_picture: '',
      loading: false,
      dataUser: '',
      token: '',
      data: '',
    };
  }

  EditProfil = () => {
    const {
      password,
      password_confirmation,
      alamat,
      umur,
      profile_picture,
    } = this.state;
    const url = 'https://katastima-pos.herokuapp.com/api/profile/update';
    const data = {
      password: password,
      password_confirmation: password_confirmation,
      alamat: alamat,
      umur: umur,
      _method: 'PUT',
    };
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      body: this.createFormData(profile_picture, data),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        const {status} = resJson;
        if (status == 'succes') {
          ToastAndroid.show(
            'Berasil Di Ubah',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson),
            this.props.navigation.replace('Home', {screan: 'Profil'}),
          );
          this.setState({loading: false});
          this.props.navigation.navigate('Home');
        } else {
          this.setState({loading: false});
          console.log('error');
          alert('error');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('error is' + error);
      });
  };
  createFormData = (photo, body) => {
    const data = new FormData();

    data.append('avatar', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({profile_picture: response});
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        this.setState({data: this.props.route.params.data});
      } else {
        console.log('tidak ada token');
      }
    });
  }

  render() {
    console.log('ini data user', this.props.route.params.data);
    return (
      <View style={styles.utama}>
        <TouchableOpacity style={styles.bingkai}>
          {this.state.profile_picture != '' ? (
            <Image
              source={{uri: this.state.profile_picture}}
              style={styles.foto}
            />
          ) : (
            <Image
              source={{uri: this.state.data.profile_picture}}
              style={styles.foto}
            />
          )}
        </TouchableOpacity>
        <View style={styles.boxIcon}>
          <TouchableNativeFeedback onPress={() => this.handleChoosePhoto()}>
            <Image
              source={require('../../../assets/logoAplikasi/pngaaa.com-607749.png')}
              style={styles.icon}
            />
          </TouchableNativeFeedback>
        </View>
        <Text></Text>
      </View>
    );
  }
}

export default EditProfil;
