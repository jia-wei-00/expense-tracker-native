import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { increment } from "@/store/features/counter/counter-slice";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const date = new Date().toLocaleDateString("en-MY", {
    month: "long",
  });

  return (
    <>
      {/* <View style={styles.container}> */}
      <Text>{date}</Text>
      <View style={styles.topContainer}>
        <View style={styles.overall}>
          <Text>Expense</Text>
          <Text>RM1000</Text>
        </View>
        <View style={styles.overall}>
          <Text>Income</Text>
          <Text>RM1000</Text>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text>Records</Text>
        {/* <Searchbar
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            height: 30,
          }}
          inputStyle={{
            minHeight: 0,
            padding: 0,
            fontSize: 12,
            margin: 0,
          }}
        /> */}
      </View>
      <Divider />
      <Button onPress={() => dispatch(increment())}>
        <ButtonText>Increment</ButtonText>
      </Button>
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   display: "flex",
  //   flexDirection: "column",
  //   gap: 10,
  // },
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
    backgroundColor: "white",
  },
});

export default Home;
