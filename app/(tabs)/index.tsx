import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { increment } from "@/store/features/counter/counter-slice";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const date = new Date().toLocaleDateString("en-MY", {
    month: "long",
  });

  return (
    <VStack>
      <Text>{date}</Text>
      <HStack>
        <VStack>
          <Text>Expense</Text>
          <Text>RM1000</Text>
        </VStack>
        <VStack>
          <Text>Income</Text>
          <Text>RM1000</Text>
        </VStack>
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
