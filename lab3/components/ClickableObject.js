import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { 
  TapGestureHandler, LongPressGestureHandler, PanGestureHandler, 
  FlingGestureHandler, PinchGestureHandler, Directions, State 
} from 'react-native-gesture-handler';
import { useGame } from '../context/GameContext';

export default function ClickableObject() {
  const { addPoints } = useGame();
  
  // Рефи для всіх (!) жестів, щоб вони могли працювати одночасно
  const pinchRef = useRef(null);
  const panRef = useRef(null);
  const longPressRef = useRef(null);
  const doubleTapRef = useRef(null);
  const flingRightRef = useRef(null);
  const flingLeftRef = useRef(null);

  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animateAction = (s) => {
    Animated.sequence([
      Animated.timing(scale, { toValue: s, duration: 150, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();
  };

  const onGesture = (event, points, type) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const finalPoints = type.includes('fling') ? Math.floor(Math.random() * 10) + 1 : points;
      addPoints(finalPoints, type);
      animateAction(1.3);
    }
  };

  return (
    <View style={styles.wrapper}>
      <PinchGestureHandler
        ref={pinchRef}
        simultaneousHandlers={[panRef, longPressRef, flingRightRef, flingLeftRef]}
        onGestureEvent={Animated.event([{ nativeEvent: { scale: scale } }], { useNativeDriver: true })}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.oldState === State.ACTIVE) {
            addPoints(3, 'pinch');
            Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
          }
        }}
      >
        <Animated.View>
          <FlingGestureHandler
            ref={flingRightRef}
            direction={Directions.RIGHT}
            simultaneousHandlers={[pinchRef, panRef, longPressRef]}
            onHandlerStateChange={(e) => onGesture(e, 0, 'flingRight')}
          >
            <Animated.View>
              <FlingGestureHandler
                ref={flingLeftRef}
                direction={Directions.LEFT}
                simultaneousHandlers={[pinchRef, panRef, longPressRef]}
                onHandlerStateChange={(e) => onGesture(e, 0, 'flingLeft')}
              >
                <Animated.View>
                  <PanGestureHandler
                    ref={panRef}
                    activeOffsetY={[-20, 20]} 
                    failOffsetX={[-20, 20]}  
                    simultaneousHandlers={[pinchRef, longPressRef, flingRightRef, flingLeftRef]}
                    onGestureEvent={Animated.event([{ nativeEvent: { translationY: translateY } }], { useNativeDriver: true })}
                    onHandlerStateChange={(e) => {
                      if (e.nativeEvent.oldState === State.ACTIVE) {
                        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
                        addPoints(2, 'pan');
                      }
                    }}
                  >
                    <Animated.View>
                      <LongPressGestureHandler
                        ref={longPressRef}
                        minDurationMs={3000}
                        maxDist={500}
                        simultaneousHandlers={[panRef, pinchRef, flingRightRef, flingLeftRef]}
                        onHandlerStateChange={(e) => onGesture(e, 5, 'longPress')}
                      >
                        <Animated.View>
                          <TapGestureHandler
                            ref={doubleTapRef}
                            numberOfTaps={2}
                            onHandlerStateChange={(e) => onGesture(e, 2, 'doubleTap')}
                          >
                            <Animated.View>
                              <TapGestureHandler
                                waitFor={doubleTapRef}
                                onHandlerStateChange={(e) => onGesture(e, 1, 'tap')}
                              >
                                <Animated.View style={[styles.box, { transform: [{ scale }, { translateY }] }]}>
                                  <Text style={styles.text}>Click</Text>
                                </Animated.View>
                              </TapGestureHandler>
                            </Animated.View>
                          </TapGestureHandler>
                        </Animated.View>
                      </LongPressGestureHandler>
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </FlingGestureHandler>
            </Animated.View>
          </FlingGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 160,
    height: 160,
    backgroundColor: '#8b5cf6',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#8b5cf6', 
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  text: { color: 'white', fontWeight: 'bold', fontSize: 24 }
});