import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from '../../../assets/style/boxAllRole/boxProfil/index';
const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(
      'http://sammpah.herokuapp.com/password/reset',
    );
    if (supported) {
      await Linking.openURL('http://sammpah.herokuapp.com/password/reset');
    } else {
      Alert.alert(
        `Don't know how to open this URL: ${'http://sammpah.herokuapp.com/password/reset'}`,
      );
    }
  }, [url]);

  return (
    <View style={styles.tomabol}>
      <TouchableNativeFeedback onPress={handlePress}>
        <Text style={{...styles.taksfFitur, color: 'blue'}}>{children}</Text>
      </TouchableNativeFeedback>
    </View>
  );
};
export class Profil extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      role: '',
    };
    console.log('ini profil');
  }
  Profil(token) {
    const url = 'https://katastima-pos.herokuapp.com/api/profile';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({data: resJson.data, loading: false});
        console.log(this.state.data);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        AsyncStorage.getItem('role').then((role) => {
          // this.setState({token: token});
          console.log(token);
          this.setState({role: role});
          console.log('ini profil ', this.state.role);
          this.Profil(token);
        });
      } else {
        console.log('tidak ada token');
      }
    });
  }

  LogOut = () => {
    AsyncStorage.clear();
    this.props.navigation.replace('Splash');
  };
  admin = (role) => {
    return (
      <>
        {role != 'admin' ? (
          <View></View>
        ) : (
          <TouchableOpacity
            style={styles.klikFitur}
            onPress={() => this.props.navigation.navigate('UpToko')}>
            <Text style={styles.taksfFitur}> Update Toko </Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  render() {
    return (
      <View style={styles.utama}>
        <ScrollView>
          {this.state.data == '' ? (
            <View></View>
          ) : (
            <View>
              <View style={styles.Bio}>
                <View style={styles.bingkai}>
                  <Image
                    source={{uri: this.state.data.profile_picture}}
                    style={styles.foto}
                  />
                </View>
                <View>
                  <Text style={styles.taksBio}> {this.state.data.name}</Text>
                </View>
                <View>
                  <Text style={styles.taksBio}> {this.state.data.email}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.klikFitur}
                  onPress={() =>
                    this.props.navigation.navigate('EditProfil', {
                      data: this.state.data,
                    })
                  }>
                  <Text style={styles.taksfFitur}> Setting </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.klikFitur}
                  onPress={() => this.props.navigation.navigate('Password')}>
                  <Text style={styles.taksfFitur}> Ubah Password </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.klikFitur}>
                  <OpenURLButton url={this.state.url}>
                    Lupa Password
                  </OpenURLButton>
                </TouchableOpacity> */}
                {this.admin(this.state.role)}
              </View>
              <View style={styles.tombol}>
                <TouchableNativeFeedback onPress={() => this.LogOut()}>
                  <Text style={styles.taksTombol}> Keluar </Text>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Profil;
