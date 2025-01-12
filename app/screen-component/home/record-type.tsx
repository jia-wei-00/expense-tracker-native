import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import React from "react";
import { LayoutChangeEvent, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface RecordTypeProps {
  recordType: "expense" | "income";
  setRecordType: (type: "expense" | "income") => void;
}

const RecordTypeBlock = ({ recordType, setRecordType }: RecordTypeProps) => {
  const translateX = useSharedValue<number>(0);
  const containerWidth = useSharedValue<number>(0);

  const handlePress = (type: "expense" | "income") => {
    setRecordType(type);
    translateX.value = withSpring(
      type === "expense" ? 0 : containerWidth.value
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <HStack className="relative">
      <Animated.View
        style={[style.underline, animatedStyle]}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          containerWidth.value = width;
        }}
      />
      <Pressable
        className="flex-1 h-8 justify-center"
        onPress={() => handlePress("expense")}
      >
        <Text.Bold className="text-center">Expenses</Text.Bold>
      </Pressable>
      <Pressable
        className="flex-1 h-8 justify-center"
        onPress={() => handlePress("income")}
      >
        <Text.Bold className="text-center">Income</Text.Bold>
      </Pressable>
    </HStack>
  );
};

const style = StyleSheet.create({
  underline: {
    position: "absolute",
    borderBottomWidth: 2,
    borderBottomColor: "blue",
    width: "50%",
    bottom: 0,
  },
});

export default RecordTypeBlock;
