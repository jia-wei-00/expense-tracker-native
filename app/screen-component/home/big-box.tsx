import React from "react";
import { Text } from "@/components";
import { VStack } from "@/components/ui/vstack";

interface BigBoxProps {
  title: string;
  value: string;
}

const BigBox = ({ title, value }: BigBoxProps) => {
  return (
    <VStack className="flex-1 items-center dark:bg-white bg-slate-700 rounded-lg p-3">
      <Text.Title reverse>{title}</Text.Title>
      <Text.Bold reverse>{value}</Text.Bold>
    </VStack>
  );
};

export default BigBox;