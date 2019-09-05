import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import Card from '../components/card';
import { AuthSession } from 'expo';


export default class HomeScreen extends Component {
  render() {

     const spotifyCredentials = {
       clientId: '0f6e0709f0b44b78a0cd70913d2382b9',
       clientSecret: '709d273eccfd450382c6cd2cb8b6b9ba',
       redirectUri: 'https://auth.expo.io/@catherinemcgee/expo-template-bare'
     }


     const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                        'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                        'playlist-modify-private','user-read-recently-played','user-top-read'];
     const scopes = scopesArr.join(' ');

     const getAuthorizationCode = async () => {
       try {
         const credentials = spotifyCredentials;
         const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
         const result = await AuthSession.startAsync({
           authUrl:
             'https://accounts.spotify.com/authorize' +
             '?response_type=code' +
             '&client_id=' +
             credentials.clientId +
             (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
             '&redirect_uri=' +
             encodeURIComponent(redirectUrl),
         });
         console.log("first result is " + JSON.stringify(result));
        return("hello");
       } catch (err) {
         console.error("first error is " + err)
         return("error")
       }
        return('hello');
     }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.getAuthorizationCode()}</Text>
      </View>


  );
}
};
