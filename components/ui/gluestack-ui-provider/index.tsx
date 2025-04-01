import React from "react";
import { config } from "./config";
import { View } from "react-native";
import { OverlayProvider } from "@gluestack-ui/overlay";

export function GluestackUIProvider({
  mode = "light",
  ...props
}: {
  mode?: "light" | "dark";
  children?: any;
}) {
  return (
    <View
      style={[
        config[mode],
        { flex: 1, height: "100%", width: "100%" },
        // @ts-ignore
        props.style,
      ]}
    >
      <OverlayProvider>{props.children}</OverlayProvider>
    </View>
  );
}
