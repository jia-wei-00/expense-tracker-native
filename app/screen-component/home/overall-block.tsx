import { HStack } from "@/components/ui/hstack";
import React from "react";
import BigBox from "./big-box";

const OverallBlock = () => {
  return (
    <HStack space="sm">
      <BigBox title="Expense" value="RM1000" />
      <BigBox title="Income" value="RM1000" />
    </HStack>
  );
};

export default OverallBlock;
