import React from "react";
import { Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { Button } from "react-native-paper";
import { increment } from "../store/features/counter/counter-slice";
import { TopBar, BottomBar } from "../components";
const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <TopBar />
      <Text>home</Text>
      <Text>{count}</Text>
      <Button onPress={() => dispatch(increment())}>Increment</Button>
      <BottomBar />
    </>
  );
};

export default Home;
