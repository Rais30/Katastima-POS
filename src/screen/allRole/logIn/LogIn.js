import React, {Component} from 'react';
import {Text, View} from 'react-native';
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
        <Text> LogIn </Text>
      </View>
    );
  }
}

export default LogIn;
