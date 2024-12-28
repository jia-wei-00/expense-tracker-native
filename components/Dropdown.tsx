import React from "react";
import { Box } from "./ui/box";
import { VStack } from "./ui/vstack";

const Dropdown = () => {
  return (
    <Box className="absolute top-[47px] right-0">
      <VStack space="md" reversed={false}>
        <Box className="h-20 w-20 bg-primary-300" />
        <Box className="h-20 w-20 bg-primary-400" />
        <Box className="h-20 w-20 bg-primary-500" />
      </VStack>
    </Box>
  );
};

export default Dropdown;
