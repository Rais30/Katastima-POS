import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import styles from '../../assets/style/boxKasir/boxHomeKasir/index';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      dataBarang: [2],
      dataMember: '',
      loading: false,
      data: '',
      data1: '',
      dataKosong: '',
      modalMember: false,
      token: '',
    };
  }
  Member = () => {
    return (
      <View style={styles.boxDataMember}>
        <View style={styles.dataMember}>
          <Text>Nama : </Text>
          <Text> Rais azaria </Text>
        </View>
        <View style={styles.dataMember}>
          <Text>Alamat : </Text>
          <Text> DI Yogyakarta </Text>
        </View>
        <View style={styles.dataMember}>
          <Text>Email : </Text>
          <Text> email@gmail.com </Text>
        </View>
        <View style={styles.dataMember}>
          <Text>Saldo : </Text>
          <Text> Rp.1.000.000,- </Text>
        </View>
        <View style={styles.dataMember}>
          <Text>Diskon : </Text>
          <Text> 10 % </Text>
        </View>
        <TouchableNativeFeedback
          onPress={() => this.setState({dataMember: this.state.dataKosong})}>
          <Image
            style={{
              ...styles.Icon,
              margin: 10,
              backgroundColor: 'red',
            }}
            source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
          />
        </TouchableNativeFeedback>
      </View>
    );
  };
  Barang = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.dataBarang}>
            <Text> 1 </Text>
          </View>
          <View style={styles.dataBarang}>
            <Text> Mie Indomie</Text>
          </View>
          <View style={styles.dataBarang}>
            <Text> Rp.3.000,-</Text>
          </View>
          <View style={styles.dataBarang}>
            <Text> 5 </Text>
          </View>
          <View style={styles.dataBarang}>
            <Text> Rp.15.000 </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text> Total : </Text>
          <Text>Rp. 15.000,-</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headher}>
          <TouchableNativeFeedback
            onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
              style={styles.Icon}
            />
          </TouchableNativeFeedback>
          <Text style={styles.taksIcon}> atastima</Text>
        </View>
        <ScrollView style={styles.utama}>
          <View style={{...styles.boxInputMember, alignSelf: 'center'}}>
            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Cari')}>
              <Text style={{fontSize: 20, color: 'white', padding: 5}}>
                Pencarian Barang
              </Text>
            </TouchableNativeFeedback>
          </View>
          <ScrollView>
            {this.state.dataBarang == '' ? (
              <View></View>
            ) : (
              <View>{this.Barang()}</View>
            )}
          </ScrollView>
          <View style={{flexDirection: 'row', padding: 5}}></View>
          <View style={styles.boxInputMember}>
            <TextInput
              placeholder="Member"
              onChangeText={(taks) =>
                this.setState({
                  data: taks,
                })
              }
            />
            <TouchableNativeFeedback
              onPress={() => this.setState({modalMember: true})}>
              <Image
                style={{...styles.Icon, margin: 10}}
                source={require('../../assets/logoAplikasi/pngaaa.com-607749.png')}
              />
            </TouchableNativeFeedback>
          </View>
          {this.state.dataMember == '' ? (
            <View></View>
          ) : (
            <View>{this.Member()}</View>
          )}

          <View style={styles.klikBayar}>
            <TouchableNativeFeedback>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                  padding: 5,
                }}>
                Pembanyaran
              </Text>
            </TouchableNativeFeedback>
          </View>
        </ScrollView>
        <Modal
          visible={this.state.modalMember}
          animationType="fade"
          onRequestClose={() => this.setState({modalMember: false})}
          transparent>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            {this.Member()}
          </View>
        </Modal>
      </View>
    );
  }
}

export default Home;
