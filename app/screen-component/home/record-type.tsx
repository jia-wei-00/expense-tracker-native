import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import React from "react";
import { Pressable } from "react-native";
import { Text } from "@/components";

interface RecordTypeProps {
  setRecordType: (type: "expense" | "income") => void;
}

const RecordTypeBlock = ({ setRecordType }: RecordTypeProps) => {
  return (
    <HStack className="relative">
      <Box className="absolute w-1/2 border border-b-indigo-500 bottom-0" />
      <Pressable
        className="flex-1 h-8 justify-center"
        onPress={() => setRecordType("expense")}
      >
        <Text.Bold className="text-center">Expenses</Text.Bold>
      </Pressable>
      <Pressable
        className="flex-1 h-8 justify-center"
        onPress={() => setRecordType("income")}
      >
        <Text.Bold className="text-center">Income</Text.Bold>
      </Pressable>
    </HStack>
  );
};

export default RecordTypeBlock;
