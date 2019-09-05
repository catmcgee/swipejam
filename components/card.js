import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const Cards = [
  { id: "1", uri: require('../assets/2.png') },
  { id: "2", uri: require('../assets/1.png') },
  { id: "3", uri: require('../assets/3.jpeg') },
];

type Props = {
  cards: *,
};

export default class Card extends Component<Props>{
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>
        </View>
        <View style={{ flex: 1 }}>
        {this.renderCards()}
      </View>
        <View style={{ height: 60 }}>
        </View>
      </View>
  );
};

renderCards = () => {
  return Cards.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i == this.state.currentIndex) {
        return (
          <Animated.View
              {...this.PanResponder.panHandlers}
              key={i}
              style={[this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: "absolute"
                }
              ]}
            >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      }

      else {
        return (
          <Animated.View
      key={item.id} style={[{
      opacity: this.nextCardOpacity,
      transform: [{ scale: this.nextCardScale }],
      height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
      }]
  }>
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      }
    }).reverse();
};

componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
         this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
      onPanResponderRelease: (evt, gestureState) => {
      },
      onPanResponderRelease: (evt, gestureState) => {
              if (gestureState.dx > 120) {
                Animated.spring(this.position, {
                  toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
                }).start(() => {
                  this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                    this.position.setValue({ x: 0, y: 0 })
                  })
                })
              } else if (gestureState.dx < -120) {
                Animated.spring(this.position, {
                  toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                }).start(() => {
                  this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                    this.position.setValue({ x: 0, y: 0 })
                  })
                })
              } else {
          Animated.spring(this.position, {
             toValue: { x: 0, y: 0 },
             friction: 4
             }).start()
          }
      }
    })
}

constructor() {
    super()
    this.position = new Animated.ValueXY()
    this.state = {
       currentIndex: 0
    }
    this.rotate = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
        transform: [{
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
        ]
     }
     this.nextCardOpacity = this.position.x.interpolate({
   inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
   outputRange: [1, 0, 1],
   extrapolate: 'clamp'
})
this.nextCardScale = this.position.x.interpolate({
   inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
   outputRange: [1, 0.8, 1],
   extrapolate: 'clamp'
})
}

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
