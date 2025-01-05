import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import TabButton from "./TabButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
interface BottomBarProps extends BottomTabBarProps {}
const BottomBar = ({ state, descriptors, navigation }: BottomBarProps) => {
  const [dimensions, setDimensions] = React.useState({
    height: 0,
    width: 0,
  });
  const buttonWidth = dimensions.width / state.routes.length;
  const onTabbarLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setDimensions(nativeEvent.layout);
  };
  const tabPositionX = useSharedValue(0);
  const animatedSpacerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });
  return (
    <View onLayout={onTabbarLayout} style={styles.container}>
      <Animated.View
        style={[
          styles.spacer,
          animatedSpacerStyle,
          { height: dimensions.height - 15, width: buttonWidth - 15 },
        ]}
      />
      {state?.routes.map((route, index) => (
        <TabButton
          key={route.name}
          width={buttonWidth}
          onPress={() => {
            tabPositionX.value = withSpring(index * buttonWidth, {
              duration: 1000,
            });
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }}
          active={state.index === index}
          icon={({ ...props }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({
                focused: state.index === index,
                ...props,
              });
            }
          }}
        >
          {route.name}
        </TabButton>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkgray",
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    left: 20,
    right: 20,
    shadowOpacity: 0.1,
  },
  spacer: {
    position: "absolute",
    backgroundColor: "purple",
    borderRadius: 100,
    left: 7.5,
    right: 7.5,
  },
});
export default BottomBar;
