import { Category, Expense } from "@/store/features";
import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Text } from "@/components";
import Legend from "./legend";
import { chartColors as colors } from "@/constants";
import { useAppSelector } from "@/hooks";

export interface ChartProps {
  data: Array<Expense>;
  categories: Array<Category>;
}

export interface ChartData {
  value: number;
  color: string;
  gradientCenterColor: string;
  focused: boolean;
  categoryName: string;
  amount: number;
  categoryId: number;
}

const Chart = ({ data, categories }: ChartProps) => {
  const { theme } = useAppSelector((state) => state.settings);

  const processedData = React.useMemo(() => {
    const categoryTotals = data.reduce((acc, expense) => {
      if (expense.category && expense.amount) {
        const categoryId = expense.category;
        if (!acc[categoryId]) {
          acc[categoryId] = 0;
        }
        acc[categoryId] += expense.amount;
      }
      return acc;
    }, {} as Record<number, number>);

    // Calculate total amount for percentage calculation
    const totalAmount = Object.values(categoryTotals).reduce(
      (sum, amount) => sum + amount,
      0
    );

    // Create pie chart data
    const pieChartData = Object.entries(categoryTotals).map(
      ([categoryId, amount], index) => {
        const category = categories.find(
          (cat) => cat.id === parseInt(categoryId)
        );
        const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;

        return {
          value: percentage,
          color: colors[index % colors.length],
          gradientCenterColor: colors[index % colors.length],
          focused: category?.name === "Salary",
          categoryName: category?.name || `Category ${categoryId}`,
          amount: amount,
          categoryId: parseInt(categoryId),
        };
      }
    );

    return {
      pieData: pieChartData,
      totalAmount,
      highestCategory:
        pieChartData.length > 0
          ? pieChartData.reduce((prev, current) =>
              prev.value > current.value ? prev : current
            )
          : null,
    };
  }, [data, categories]);

  const { pieData, highestCategory } = processedData;

  if (pieData.length > 0) {
    return (
      <>
        <View className="p-4 items-center">
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={theme === "dark" ? "#232B5D" : "#F5F5F5"}
            centerLabelComponent={() => {
              return (
                <View className="justify-center items-center">
                  <Text.Subtitle>
                    {highestCategory
                      ? `${highestCategory.value.toFixed(1)}%`
                      : "0%"}
                  </Text.Subtitle>
                  <Text.Subtitle>
                    {highestCategory ? highestCategory.categoryName : "No data"}
                  </Text.Subtitle>
                </View>
              );
            }}
          />
        </View>
        <Legend pieData={pieData} />
      </>
    );
  }
};

export default Chart;
