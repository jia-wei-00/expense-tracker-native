import React from "react";
import { Text } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Button } from "react-native-paper";
import { increment } from "@/store/features/counter/counter-slice";

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <Text>home</Text>
      <Text>{count}</Text>
      <Button onPress={() => dispatch(increment())}>Increment</Button>
    </>
  );
};

export default Home;
