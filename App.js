import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/homescreen';
import SettingsScreen from './screens/settings';

class Home extends React.Component {
  render() {
    return (
      <HomeScreen></HomeScreen>
    );
  }
}

class Settings extends React.Component {
  render() {
    return (
    <SettingsScreen></SettingsScreen>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
});

export default createAppContainer(TabNavigator);
