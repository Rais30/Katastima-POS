import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableNativeFeedback,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
  Linking,
  Modal,
  Alert,
} from 'react-native';
import styles from '../../../assets/style/boxAllRole/boxAutentikasi/boxAutentivikasi';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <View style={styles.tomabol}>
      <TouchableNativeFeedback onPress={handlePress}>
        <Text style={styles.teksKlik}>{children}</Text>
      </TouchableNativeFeedback>
    </View>
  );
};
export class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      email: '',
      password: '',
      loading: false,
      url: 'http://sammpah.herokuapp.com/password/reset',
      modal: false,
      visible: true,
    };
  }
  alert() {
    Alert.alert(
      '',
      'Convirmation Email Anda',
      [
        {
          text: 'Convirmation',
          onPress: () => this.handlePress1(),
        },
      ],
      {cancelable: false},
    );
  }
  handlePress1 = async () => {
    const supported = await Linking.canOpenURL(this.state.url);
    if (supported) {
      await Linking.openURL(this.state.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${this.state.url}`);
    }
  };

  LogIn() {
    const {email, password} = this.state;
    const url = `https://katastima-pos.herokuapp.com/api/auth/login`;
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'applicetion/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log(resjson);
        const {token} = resjson;
        if (token) {
          ToastAndroid.show(
            ' Anda Telah Masuk',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            // console.log(resJson),
            AsyncStorage.setItem('token', token),
            this.setState({loading: false}),
            // this.props.navigation.navigate('Login'),
          );
        } else if (resjson.error) {
          alert(resjson.error);
          this.setState({loading: false});
        } else {
          console.log(error);
          this.setState({loading: false});
        }
      });
  }

  render() {
    return (
      <View style={styles.utama}>
        <ScrollView>
          <View style={styles.headher}>
            <Image
              style={styles.gambar}
              source={require('../../../assets/logoAplikasi/pngaaa.com-607749.png')}
            />
          </View>
          <View style={styles.body}>
            <View style={{...styles.boxInput, marginTop: 80}}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(teks) => this.setState({email: teks})}
              />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(teks) => this.setState({password: teks})}
                secureTextEntry={this.state.visible}
              />
            </View>
            <View style={styles.boxTeks}>
              <View>
                <Text style={styles.teksKlik}>RememberMy</Text>
              </View>
              <View>
                <OpenURLButton url={this.state.url}>
                  Lupa Password
                </OpenURLButton>
              </View>
            </View>
            <TouchableNativeFeedback onPress={() => this.LogIn()}>
              <View
                style={{
                  ...styles.tombol,
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}>
                {this.state.loading ? (
                  <ActivityIndicator size={25} color="white" />
                ) : (
                  <Text style={styles.teksTombol}> Masuk </Text>
                )}
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Register')}>
              <View style={{...styles.tombol, marginVertical: 0}}>
                <Text style={styles.teksTombol}> Daftar </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default LogIn;
