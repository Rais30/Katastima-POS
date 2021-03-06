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
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from '../../assets/style/boxAllRole/boxUpdate/Update';

export class UpToko extends Component {
  constructor() {
    super();
    this.state = {
      nama_bisnis: '',
      email: '',
      alamat_bisnis: '',
      telepon: '',
      diskon_member: '',
      loading: false,
      dataUser: '',
      token: '',
      data: '',
      role: '',
      logo_bisnis: null,
    };
  }

  EditProfil = () => {
    const {
      nama_bisnis,
      email,
      alamat_bisnis,
      telepon,
      logo_bisnis,
      role,
      diskon_member,
    } = this.state;
    const url = 'https://katastima-pos.herokuapp.com/api/profile/update';
    const data = {
      nama_bisnis: nama_bisnis,
      email: email,
      alamat_bisnis: alamat_bisnis,
      telepon: telepon,
      diskon_member: diskon_member,
      _method: 'PUT',
    };
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      body: this.createFormData(logo_bisnis, data),
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
            'Berasil UPDATE',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.replace('admin');
          this.setState({loading: false});
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
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({logo_bisnis: response});
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        console.log('token ada');
        this.setState({token: token});
      } else {
        console.log('tidak ada token');
      }
    });
  }

  render() {
    return (
      <View style={styles.utama}>
        <ScrollView>
          <TouchableOpacity
            style={styles.bingkai}
            onPress={() => this.handleChoosePhoto()}>
            {this.state.logo_bisnis == null ? (
              <View style={styles.foto}>
                <Text>Masukan Foto Toko anda</Text>
              </View>
            ) : (
              <Image
                source={{uri: this.state.logo_bisnis.uri}}
                style={styles.foto}
              />
            )}
          </TouchableOpacity>

          <View style={styles.boxDataInput}>
            <View>
              <Text style={styles.taksTitle}>Name Toko :</Text>
              <View>
                <TextInput
                  placeholder="Nama Toko"
                  onChangeText={(taks) => this.setState({nama_bisnis: taks})}
                />
              </View>
            </View>
            <View>
              <Text style={styles.taksTitle}>Alamat Toko :</Text>
              <View>
                <TextInput
                  placeholder="Alamat Toko"
                  onChangeText={(taks) => this.setState({alamat_bisnis: taks})}
                />
              </View>
            </View>
            <View>
              <Text style={styles.taksTitle}>Nomer Telephone :</Text>
              <View>
                <TextInput
                  placeholder="No Telephone"
                  keyboardType="number-pad"
                  onChangeText={(taks) => this.setState({telepon: taks})}
                />
              </View>
            </View>
            <View>
              <Text style={styles.taksTitle}>Diskon Member :</Text>
              <View>
                <TextInput
                  placeholder=" 0% "
                  onChangeText={(taks) => this.setState({diskon_member: taks})}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
          <View style={styles.tombol}>
            {this.state.loading ? (
              <ActivityIndicator size={30} color="white" />
            ) : (
              <TouchableNativeFeedback onPress={() => this.EditProfil()}>
                <Text style={styles.taksTombol}> Simpan </Text>
              </TouchableNativeFeedback>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default UpToko;
