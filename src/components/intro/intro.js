import React, {Component} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

export class Intro extends Component {
  render() {
    return (
      <Onboarding
        onDone={() => this.props.navigation.replace('LogIn')}
        onSkip={() => this.props.navigation.replace('LogIn')}
        pages={[
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 250,
                  height: 250,
                }}
                source={require('../../assets/lotteview/22620-store.json')}
                autoPlay={true}
              />
            ),
            title: 'Lebih Mudah muali sekarang',
            subtitle: 'lebih mudah melakukan transaksi ada di genggaman anda',
          },
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 250,
                  height: 250,
                }}
                source={require('../../assets/lotteview/37452-mobile-phone-blue.json')}
                autoPlay={true}
              />
            ),
            title: 'Belanja dimana aja',
            subtitle: 'kami memudahkan anda melakukan pembelian kebutuhan anda',
          },
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 250,
                  height: 250,
                }}
                source={require('../../assets/lotteview/11257-mobile-payment-scan.json')}
                autoPlay={true}
              />
            ),
            title: 'Apapun Menggunakan smart phone',
            subtitle: 'Cara Mudah Mendapatkan Penghasilan',
          },
        ]}
      />
    );
  }
}

export default Intro;
