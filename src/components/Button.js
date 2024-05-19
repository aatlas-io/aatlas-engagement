import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ containerStyle, onPress, children }) => {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    opacity.value = withSpring(0.8);
    scale.value = withTiming(0.95, {
      duration: 50,
    });
  };

  const handlePressOut = () => {
    opacity.value = withSpring(1);
    scale.value = withTiming(1, {
      duration: 150,
    });
  };

  const animatedScale = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[containerStyle, { opacity, ...animatedScale }]}
    >
      {children}
    </AnimatedPressable>
  );
};

export default Button;
