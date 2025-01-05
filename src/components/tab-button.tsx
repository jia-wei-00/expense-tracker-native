import React from "react";
import { Animated, LayoutAnimation, useAnimatedValue } from "react-native";
import { Button, ButtonProps, Text } from "react-native-paper";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface TabButtonProps extends ButtonProps {
  active: boolean;
}

const TabButton = ({ children, active, mode, ...props }: TabButtonProps) => {
  const fadeAnim = useAnimatedValue(0);
  const widthAnim = useAnimatedStyle(() => ({
    width: active ? "0%" : "0%",
  }));
  const progress = useSharedValue(0);

  const backgroundColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", "purple"]
    );

    return {
      backgroundColor: color,
    };
  });

  const fadeIn = () => {
    Animated.spring(fadeAnim, {
      toValue: active ? 1 : 0,
      tension: 100,
      friction: 10,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    fadeIn();
    // animateWidth();
  }, [active]);
  return (
    <Animated.View style={backgroundColor}>
      <Button
        mode={mode ?? "contained"}
        style={{
          backgroundColor: !active ? "transparent" : "purple",
        }}
        {...props}
      >
        {active && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={{ color: "black" }}>{children}</Text>
          </Animated.View>
        )}
      </Button>
    </Animated.View>
  );
};

export default TabButton;
