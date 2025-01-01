import React from "react";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

interface BigBoxProps {
  title: string;
  value: string;
}

const BigBox = ({ title, value }: BigBoxProps) => {
  return (
    <VStack className="flex-1 items-center dark:bg-white rounded-lg p-3">
      <Text className="text-lg font-bold dark:text-slate-800">{title}</Text>
      <Text className="text-lg font-semibold dark:text-slate-800">{value}</Text>
    </VStack>
  );
};

export default BigBox;
