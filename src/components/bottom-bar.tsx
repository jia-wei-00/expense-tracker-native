import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabButton from "./tab-button";

interface BottomBarProps extends BottomTabBarProps {}

const BottomBar = ({ state, descriptors, navigation }: BottomBarProps) => {
  return (
    <View style={{ backgroundColor: "black" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: 10,
          margin: 5,
          borderRadius: 100,
        }}
      >
        {state?.routes.map((route, index) => (
          <TabButton
            key={route.key}
            onPress={() => {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }}
            active={state.index === index}
            icon={() => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({
                  focused: true,
                  color: "black",
                  size: 24,
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
  bottom: {
    backgroundColor: "aquamarine",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: "absolute",
    right: 16,
  },
});

export default BottomBar;
