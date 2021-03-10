import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View} from 'react-native';

export class Pengeluaran extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      months: '',
      month: '',
      date: '',
      year: '',
    };
  }
  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    this.setState({date: date, month: month, year: year});
  };
  getMonth = () => {
    return this.state.months
      .filter((item, index) => this.state.month == index + 1)
      .map((v, i) => {
        return this.state.date + ' ' + v + ' ' + this.state.year;
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        this.setState({token: token});
        console.log(this.state.token);
      } else {
        console.log('tidak ada token');
      }
    });
  }
  render() {
    return (
      <View>
        <Text> ini pengeluaran </Text>
      </View>
    );
  }
}

export default Pengeluaran;
