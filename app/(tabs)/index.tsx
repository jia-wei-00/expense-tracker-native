import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { increment } from "@/store/features/counter/counter-slice";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { BigBox } from "../screen-component";

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const date = new Date().toLocaleDateString("en-MY", {
    month: "long",
  });

  return (
    <VStack space="md" className="p-4">
      <Text>{date}</Text>
      <HStack space="sm">
        <BigBox title="Expense" value="RM1000" />
        <BigBox title="Income" value="RM1000" />
      </HStack>
      <HStack>
        <Text>Records</Text>
        <Input
          variant="underlined"
          size="sm"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Enter Text here..." />
        </Input>
      </HStack>
      <Divider />
      <Text>{count}</Text>
      <Button onPress={() => dispatch(increment())}>
        <ButtonText>Increment</ButtonText>
      </Button>
      {/* </View> */}
    </VStack>
  );
};

export default Home;
