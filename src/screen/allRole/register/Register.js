import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableNativeFeedback,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from '../../../assets/style/boxAllRole/boxAutentikasi/boxAutentivikasi';

export class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
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
              <TextInput style={styles.input} placeholder="Name" />
            </View>
            <View style={styles.boxInput}>
              <TextInput style={styles.input} placeholder="Email" />
            </View>
            <View style={styles.boxInput}>
              <TextInput style={styles.input} placeholder="Password" />
            </View>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="Convirmation Password"
              />
            </View>
            <TouchableNativeFeedback
              onPress={() => this.setState({loading: !this.state.loading})}>
              <View style={styles.tombol}>
                {this.state.loading ? (
                  <ActivityIndicator size={25} color="white" />
                ) : (
                  <Text style={styles.teksTombol}> Daftar </Text>
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
