import React, { ReactNode } from "react";
import { StyleSheet, Pressable } from "react-native";
import { ButtonProps, Icon } from "react-native-paper";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface TabButtonProps extends ButtonProps {
  active: boolean;
}

const TabButton = ({
  children,
  active,
  mode,
  icon,
  ...props
}: TabButtonProps) => {
  const scale = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withSpring(active ? 1 : 0, { duration: 300 });
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
    <Pressable {...props} style={styles.container}>
      <Animated.View style={animatedIconStyle}>
        <Icon source={icon} size={24} color={!active ? "white" : "gray"} />
      </Animated.View>
      <Animated.Text style={animatedTextStyle}>{children}</Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "red",
  },
});

export default TabButton;
