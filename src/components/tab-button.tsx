import React, { ReactNode } from "react";
import { StyleSheet, Pressable } from "react-native";
import { ButtonProps, Icon } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface TabButtonProps extends ButtonProps {
  active: boolean;
  width: number;
}

const TabButton = ({
  children,
  active,
  mode,
  icon,
  width,
  ...props
}: TabButtonProps) => {
  const scale = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withTiming(active ? 1 : 0, { duration: 300 });
  }, [active]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [0, 1]);
    const translateY = interpolate(scale.value, [0, 1], [-10, 0]);

    return { opacity, translateY };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scale.value, [0, 1], [8, 0]);
    const scaleValue = interpolate(scale.value, [0, 1], [1.2, 1]);

    return { transform: [{ scale: scaleValue }, { translateY }] };
  });

  return (
    <Pressable {...props} style={[styles.container, { width }]}>
      <Animated.View style={animatedIconStyle}>
        <Icon source={icon} size={20} color={!active ? "white" : "gray"} />
      </Animated.View>
      <Animated.Text style={animatedTextStyle}>{children}</Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default TabButton;
