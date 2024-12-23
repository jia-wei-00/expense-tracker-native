import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { Button } from "react-native-paper";
import { increment } from "../store/features/counter/counter-slice";
import { Background } from "../components";

const Home = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const date = new Date().toLocaleDateString("en-MY", {
    month: "long",
  });

  return (
    <Background>
      <Text style={{ color: "white" }}>{date}</Text>
      <View style={styles.topContainer}>
        <View style={[styles.overall, { backgroundColor: "red" }]}>
          <Text style={{ color: "white" }}>Expense</Text>
          <Text style={{ color: "white" }}>RM1000</Text>
        </View>
        <View style={[styles.overall, { backgroundColor: "green" }]}>
          <Text style={{ color: "white" }}>Income</Text>
          <Text style={{ color: "white" }}>RM1000</Text>
        </View>
      </View>
      <Text style={{ color: "white" }}>home</Text>
      <Text style={{ color: "white" }}>{count}</Text>
      <Button onPress={() => dispatch(increment())}>Increment</Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  overall: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});

export default Home;
