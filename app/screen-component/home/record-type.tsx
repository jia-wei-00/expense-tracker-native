import { HStack } from "@/components/ui/hstack";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "@/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { TabBarProps } from "react-native-collapsible-tab-view";

interface RecordTypeProps {
  recordType: "expense" | "income";
  setRecordType: (type: "expense" | "income") => void;
  onTabPress: (type: "expense" | "income") => void;
}

const RecordTypeBlock = ({
  recordType,
  setRecordType,
  onTabPress,
}: RecordTypeProps) => {
  const { t } = useTranslation();
  const containerWidth = useSharedValue<number>(0);
  const color = useSharedValue<string>(
    recordType === "expense" ? "red" : "green"
  );
  const translateX = useSharedValue<number>(
    recordType === "expense" ? 0 : containerWidth.value
  );

  const handlePress = (type: "expense" | "income") => {
    setRecordType(type);
    translateX.value = type === "expense" ? 0 : containerWidth.value;
    color.value = type === "expense" ? "red" : "green";
    // onTabPress(type);
  };

  React.useEffect(() => {
    handlePress(recordType);
  }, [recordType]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(translateX.value, {
            duration: 700,
            dampingRatio: 0.7,
            stiffness: 50,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
          }),
        },
      ],
      backgroundColor: withTiming(color.value),
    };
  }, [recordType]);

  return (
    <HStack className="relative">
      <Animated.View
        style={[style.animatedView, animatedStyle]}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          containerWidth.value = width;
        }}
      />
      <Pressable
        className="flex-1 h-8 justify-center"
        onPress={() => handlePress("expense")}
      >
        <Text.Bold
          className={twMerge(
            "text-center",
            recordType === "expense" && "text-white"
          )}
        >
          {t("Expense")}
        </Text.Bold>
      </Pressable>
      <Pressable
        className="flex-1 h-8 justify-center"
        onPress={() => handlePress("income")}
      >
        <Text.Bold
          className={twMerge(
            "text-center",
            recordType === "income" && "text-white"
          )}
        >
          {t("Income")}
        </Text.Bold>
      </Pressable>
    </HStack>
  );
};

const style = StyleSheet.create({
  animatedView: {
    position: "absolute",
    height: "100%",
    width: "50%",
    borderRadius: 5,
  },
});

export default RecordTypeBlock;
