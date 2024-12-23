import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSignInMutation, useSignUpMutation } from "../store/features";
import { Background } from "../components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { isLoading: isSignInLoading }] = useSignInMutation();
  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          mode="contained"
          loading={isSignInLoading}
          onPress={() => signIn({ email, password })}
        >
          {isSignInLoading ? "Signing in..." : "Sign in"}
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          mode="contained"
          loading={isSignUpLoading}
          onPress={() => signUp({ email, password })}
        >
          {isSignUpLoading ? "Signing up..." : "Sign up"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    minHeight: "100%",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
