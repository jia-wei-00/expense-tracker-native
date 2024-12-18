import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import TabButton from "./tab-button";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface BottomBarProps extends BottomTabBarProps {}

const BottomBar = ({ state, descriptors, navigation }: BottomBarProps) => {
  const [dimensions, setDimensions] = React.useState({
    height: 20,
    width: 100,
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
    <View style={{ backgroundColor: "black" }}>
      <View onLayout={onTabbarLayout} style={styles.container}>
        <Animated.View
          style={[
            styles.spacer,
            animatedSpacerStyle,
            { height: dimensions.height - 15, width: dimensions.width - 15 },
          ]}
        />
        {state?.routes.map((route, index) => (
          <TabButton
            key={route.key}
            onPress={() => {
              tabPositionX.value = withSpring(index * buttonWidth, {
                duration: 1500,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    backgroundColor: "#333",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  spacer: {
    position: "absolute",
    backgroundColor: "blue",
    marginHorizontal: 10,
  },
});

export default BottomBar;
