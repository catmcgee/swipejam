import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import Card from '../components/card'

export default class HomeScreen extends Component {
  render() {
    return (
      <Card
      cards ={ [
        { id: "1", uri: require('../assets/2.png') },
        { id: "2", uri: require('../assets/1.png') },
        { id: "3", uri: require('../assets/3.jpeg') },
      ]}
      ></Card>

  );
}
};
