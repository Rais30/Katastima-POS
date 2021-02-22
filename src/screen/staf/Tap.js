import React, {Component} from 'react';
import {Text, View, Image, TouchableNativeFeedback} from 'react-native';
import styles from '../../assets/style/boxStaff/index';
import TapRumah from './Navigation/navigationStaf';

export default class Tab extends Component {
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
        <TapRumah />
      </View>
    );
  }
}
