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
      role: '',
      foto: null,
    };
  }

  EditProfil = () => {
    const {name, email, alamat, umur, foto, role} = this.state;
    const url = 'https://katastima-pos.herokuapp.com/api/profile/update';
    const data = {
      name: name,
      email: email,
      alamat: alamat,
      umur: umur,
      _method: 'PUT',
    };
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      body: this.createFormData(foto, data),
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
          );

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
          } else {
            console.log('anda orang asing masuk ke aplikasi');
          }

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
        this.setState({foto: response});
      }
    });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        AsyncStorage.getItem('role').then((role) => {
          console.log('Upadate Profil ', role);
          this.setState({role: role});
        });
        this.setState({token: token});
        this.setState({data: this.props.route.params.data});
        this.setState({
          name: this.state.data.name,
          alamat: this.state.data.alamat,
          email: this.state.data.email,
          umur: JSON.stringify(this.state.data.umur),
          profile_picture: this.state.data.profile_picture,
        });
      } else {
        console.log('tidak ada token');
      }
    });
  }

  render() {
    console.log('ini data user', this.props.route.params.data);
    return (
      <View style={styles.utama}>
        <ScrollView>
          <TouchableOpacity
            style={styles.bingkai}
            onPress={() => this.handleChoosePhoto()}>
            {this.state.foto == null ? (
              <Image
                source={{uri: this.state.profile_picture}}
                style={styles.foto}
              />
            ) : (
              <Image source={{uri: this.state.foto.uri}} style={styles.foto} />
            )}
          </TouchableOpacity>

          <View style={styles.boxDataInput}>
            <View>
              <Text style={styles.taksTitle}>Name :</Text>
              <View>
                <TextInput
                  value={this.state.name}
                  onChangeText={(taks) => this.setState({name: taks})}
                />
              </View>
            </View>
            <View>
              <Text style={styles.taksTitle}>Alamat :</Text>
              <View>
                <TextInput
                  value={this.state.alamat}
                  onChangeText={(taks) => this.setState({alamat: taks})}
                />
              </View>
            </View>
            <View>
              <Text style={styles.taksTitle}>Umur :</Text>
              <View>
                <TextInput
                  value={this.state.umur}
                  onChangeText={(taks) => this.setState({umur: taks})}
                />
              </View>
            </View>
            <View>
              <Text style={styles.taksTitle}>Email :</Text>
              <View>
                <TextInput
                  value={this.state.email}
                  onChangeText={(taks) => this.setState({email: taks})}
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

export default EditProfil;
