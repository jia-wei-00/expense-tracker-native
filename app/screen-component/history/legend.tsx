import React from "react";
import { Dot } from ".";
import { View } from "react-native";
import { PieChartPropsType } from "react-native-gifted-charts";
import { Text } from "@/components";
import { ChartData } from "./chart";
import { HStack } from "@/components/ui/hstack";

export interface LegendsProps {
  pieData: ChartData[];
}
const Legend = ({ pieData }: LegendsProps) => {
  if (pieData.length === 0) {
    return (
      <View className="items-center mt-4">
        <Text.Caption>No data available</Text.Caption>
      </View>
    );
  }

  return (
    <View className="flex flex-row flex-wrap gap-2">
      {pieData.map((item) => (
        <HStack key={item.categoryId} className="items-center w-[48%]">
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
