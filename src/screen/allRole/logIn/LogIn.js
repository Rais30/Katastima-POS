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
      email: '',
      password: '',
      loading: false,
      url: 'http://sammpah.herokuapp.com/password/reset',
    };
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
              <TextInput style={styles.input} placeholder="Email" />
            </View>
            <View style={styles.boxInput}>
              <TextInput style={styles.input} placeholder="Password" />
            </View>
            <View style={styles.boxTeks}>
              <View>
                <OpenURLButton url={this.state.url}>
                  Lupa Password
                </OpenURLButton>
              </View>
              <View>
                <Text
                  onPress={() => this.props.navigation.navigate('Register')}
                  style={styles.teksKlik}>
                  Buat Akun
                </Text>
              </View>
            </View>
            <TouchableNativeFeedback
              onPress={() => this.setState({loading: !this.state.loading})}>
              <View style={styles.tombol}>
                {this.state.loading ? (
                  <ActivityIndicator size={25} color="white" />
                ) : (
                  <Text style={styles.teksTombol}> Masuk </Text>
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
