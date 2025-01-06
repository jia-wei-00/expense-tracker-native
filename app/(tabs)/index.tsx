import React from "react";
import { Text } from "@/components";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { BigBox, Records } from "../screen-component";
import { SearchIcon } from "@/assets/Icons";

const Home = () => {
  // const date = new Date().toLocaleDateString("en-MY", {
  //   month: "long",
  // });

  return (
    <VStack space="md" className="p-4 flex-1">
      <Text.Title>123</Text.Title>
      <HStack space="sm">
        <BigBox title="Expense" value="RM1000" />
        <BigBox title="Income" value="RM1000" />
      </HStack>
      <HStack className="justify-between items-end">
        <Text.Subtitle>Records</Text.Subtitle>
        <Input variant="underlined" size="sm" className="w-2/4 gap-2">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search..." />
        </Input>
      </HStack>
      <Divider />
      <Records />
      <Divider />
      <Button>
        <ButtonText>Add</ButtonText>
      </Button>
    </VStack>
  );
};

export default Home;
