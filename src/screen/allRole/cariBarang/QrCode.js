import React, {Component} from 'react';

import {ToastAndroid} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default class ScanScreen extends Component {
  constructor() {
    super();
    this.state = {
      kode: '',
    };
  }
  Scan = (coba) => {
    try {
      console.log('dataRR==', coba.data);
      if (coba.data.length >= 8) {
        ToastAndroid.show(coba.data, ToastAndroid.LONG);
        this.setState({kode: coba.data});
        this.props.navigation.navigate('Cari', {code: coba.data});
      } else {
        ToastAndroid.show('Barcode Salah', ToastAndroid.LONG);
      }
      ToastAndroid.show(coba.data, ToastAndroid.LONG);
    } catch (err) {
      console.log('Eroro==', err);
    }
  };
  render() {
    return (
      <QRCodeScanner
        flashMode={RNCamera.Constants.FlashMode.auto}
        showMarker
        vibrate={true}
        onRead={(coba) => this.Scan(coba)}
        reactivate
      />
    );
  }
}
