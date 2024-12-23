import React, { memo } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface BackgroundProps {
  children: React.ReactNode;
}

const Background = ({ children }: BackgroundProps) => {
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView style={styles.background}>
      <KeyboardAvoidingView
        style={{ ...styles.container, paddingBottom: bottomTabBarHeight }}
        behavior="padding"
      >
        {children}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    minHeight: "100%",
    width: "100%",
    backgroundColor: "black",
  },
  container: {
    padding: 20,
    alignSelf: "center",
    justifyContent: "center",
    gap: 10,
  },
});

export default memo(Background);
