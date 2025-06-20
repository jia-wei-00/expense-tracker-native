import React from "react";
import { View } from "react-native";

export interface DotProps {
  color: string;
}

const Dot = ({ color }: DotProps) => {
  return (
    <View
      className="h-2 w-2 rounded-full mr-2"
      style={{
        backgroundColor: color,
      }}
    />
  );
};

export default Dot;
