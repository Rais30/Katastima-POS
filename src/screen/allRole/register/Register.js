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
        <Text style={{...styles.teksKlik, color: 'white'}}>{children}</Text>
      </TouchableNativeFeedback>
    </View>
  );
};

export class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      convirmasi: '',
      loading: false,
      url: 'http://sammpah.herokuapp.com/password/reset',
      visible: true,
      visible1: true,
      url1: 'https://katastima-pos.herokuapp.com/api/auth/register',
    };
  }
  alert() {
    Alert.alert(
      '',
      'Convirmation Email Anda',
      [
        {
          text: 'Convirmation',
          onPress: () => this.handlePress(),
        },
      ],
      {cancelable: false},
    );
  }
  handlePress = async () => {
    const supported = await Linking.canOpenURL(this.state.url);
    if (supported) {
      await Linking.openURL(this.state.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${this.state.url}`);
    }
  };

  Register = () => {
    const {name, email, password, convirmasi, url1} = this.state;

    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: convirmasi,
    };
    this.setState({loading: true});
    fetch(url1, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log('apa ini respon', resJson);
        if (resJson.status == 'success') {
          ToastAndroid.show(
            ' Anda Telah TerDaftar',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            // console.log(resJson),
            this.alert(),
            this.setState({loading: false}),
            this.props.navigation.navigate('LogIn'),
          );
        } else {
          this.setState({loading: false});
          console.log('error');
          alert('Periksa kemabli data anda');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('error is' + error);
      });
  };

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
                placeholder="Name"
                onChangeText={(taks) => this.setState({name: taks})}
              />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(taks) => this.setState({email: taks})}
              />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(taks) => this.setState({password: taks})}
                secureTextEntry={this.state.visible}
              />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="Convirmation Password"
                onChangeText={(taks) => this.setState({convirmasi: taks})}
                secureTextEntry={this.state.visible1}
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
      </View>
    );
  }
}

export default LogIn;
