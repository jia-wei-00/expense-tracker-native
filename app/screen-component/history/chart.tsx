import { Category, Expense } from "@/store/features";
import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface ChartProps {
  data: Array<Expense>;
  categories: Array<Category>;
}

const Chart = ({ data, categories }: ChartProps) => {
  // Generate colors dynamically
  const colors = [
    "#009FFF",
    "#93FCF8",
    "#BDB2FA",
    "#FFA5BA",
    "#FFD93D",
    "#6BCF7F",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#DDA0DD",
    "#F4A460",
  ];

  // Process data to group by category and calculate totals
  const processedData = React.useMemo(() => {
    // Group expenses by category
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
          focused: index === 0, // Focus first item
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

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    if (pieData.length === 0) {
      return (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ color: "white", fontSize: 16 }}>
            No data available
          </Text>
        </View>
      );
    }

    // Group legend items in pairs for better layout
    const legendPairs = [];
    for (let i = 0; i < pieData.length; i += 2) {
      legendPairs.push(pieData.slice(i, i + 2));
    }

    return (
      <>
        {legendPairs.map((pair, pairIndex) => (
          <View
            key={pairIndex}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            {pair.map((item, itemIndex) => (
              <View
                key={item.categoryId}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: 150,
                  marginRight: itemIndex === 0 && pair.length > 1 ? 20 : 0,
                }}
              >
                {renderDot(item.color)}
                <Text
                  style={{ color: "white", fontSize: 12, flex: 1 }}
                  numberOfLines={1}
                >
                  {item.categoryName}: {item.value.toFixed(1)}%
                </Text>
              </View>
            ))}
          </View>
        ))}
      </>
    );
  };

  if (pieData.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 18 }}>
          No expense data to display
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={"#232B5D"}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                >
                  {highestCategory
                    ? `${highestCategory.value.toFixed(1)}%`
                    : "0%"}
                </Text>
                <Text
                  style={{ fontSize: 14, color: "white", textAlign: "center" }}
                  numberOfLines={2}
                >
                  {highestCategory ? highestCategory.categoryName : "No data"}
                </Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </>
  );
};

export default Chart;
