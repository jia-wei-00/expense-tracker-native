import React from "react";
import { Dot } from ".";
import { View } from "react-native";
import { Text } from "@/components";
import { ChartData } from "./chart";
import { HStack } from "@/components/ui/hstack";

export interface LegendsProps {
  pieData: ChartData[];
}
const Legend = ({ pieData }: LegendsProps) => {
  return (
    <View className="flex flex-row flex-wrap gap-3 justify-center p-3">
      {pieData.map((item) => (
        <HStack
          key={item.categoryId}
          className="items-center justify-center w-[48%]"
        >
          <Dot color={item.color} />
          <Text.Caption>
            {item.categoryName}: {item.value.toFixed(1)}%
          </Text.Caption>
        </HStack>
      ))}
    </View>
  );
};
export default Legend;
