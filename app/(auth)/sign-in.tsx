import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { signIn, signUp } from "@/store/features";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggingIn, isSigningUp } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input variant="outline" size="md">
          <InputField
            onChangeText={(text) => setEmail(text)}
            placeholder="email@address.com"
            value={email}
          />
        </Input>
      </View>
      <View style={styles.verticallySpaced}>
        <Input variant="outline" size="md">
          <InputField
            onChangeText={(text) => setPassword(text)}
            placeholder="password"
            value={password}
            secureTextEntry={true}
          />
        </Input>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button onPress={() => dispatch(signIn({ email, password }))}>
          <ButtonText>{isLoggingIn ? "Signing in..." : "Sign in"}</ButtonText>
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Button onPress={() => dispatch(signUp({ email, password }))}>
          <ButtonText>{isSigningUp ? "Signing up..." : "Sign up"}</ButtonText>
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
