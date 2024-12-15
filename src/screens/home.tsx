import React from "react";
import { Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { Button } from "react-native-paper";
import { increment } from "../store/features/counter/counter-slice";
import { useSignOutMutation } from "../store/features";
import { Background } from "../components";

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [signOut, { isLoading }] = useSignOutMutation();

  return (
    <Background>
      <Text style={{ color: "white" }}>home</Text>
      <Text style={{ color: "white" }}>{count}</Text>
      <Button onPress={() => dispatch(increment())}>Increment</Button>
      <Button onPress={() => signOut("")} loading={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </Button>
    </Background>
  );
};

export default Home;
