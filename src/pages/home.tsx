import React from "react";
import { Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { Button } from "react-native-paper";
import { increment } from "../store/features/counter/counter-slice";
import { useSignOutMutation } from "../store/features";
import { TopBar } from "../components";

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [signOut] = useSignOutMutation();

  return (
    <>
      <TopBar />
      <Text>home</Text>
      <Text>{count}</Text>
      <Button onPress={() => dispatch(increment())}>Increment</Button>
      <Button onPress={() => signOut(true)}>Logout</Button>
      {/* <BottomBar /> */}
    </>
  );
};

export default Home;
