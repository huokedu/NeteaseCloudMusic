/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RootScene from './src/RootScene';

export default class NeteaseCloudMusic extends Component {
  render() {
    return (
      <RootScene />
    );
  }
}

AppRegistry.registerComponent('NeteaseCloudMusic', () => NeteaseCloudMusic);
