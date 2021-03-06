import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  TouchableNativeFeedback,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';

export class Shift extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log('anda di screan Shift');
      } else {
        console.log('tidak ada token di shift');
      }
    });
  }
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headher}></View>
        <ScrollView>
          {this.state.loading ? (
            <ActivityIndicator size={35} color="red" />
          ) : (
            <View style={styles.Posisi}>
              <TouchableNativeFeedback>
                <View style={styles.tombol}>
                  <Text style={styles.taks}> Mulai Shift </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <View style={{...styles.tombol, backgroundColor: 'red'}}>
                  <Text style={styles.taks}> Akhiri Shift </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
          <View>
            <Text> Data : </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Shift;

const styles = StyleSheet.create({
  utama: {
    flex: 1,
  },
  headher: {
    backgroundColor: 'blue',
    height: 50,
    marginBottom: 5,
  },
  tombol: {
    backgroundColor: 'green',
    padding: 8,
  },
  taks: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  Posisi: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
