import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

interface UserLogin {
  email: string;
  password: string;
}

const SignIn = () => {
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  return (
    <View>
      <TextInput
        label="Email"
        keyboardType="email-address"
        mode="outlined"
        value={userLogin.email}
        onChangeText={(text) => setUserLogin({ ...userLogin, email: text })}
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={userLogin.password}
        onChangeText={(text) => setUserLogin({ ...userLogin, password: text })}
        secureTextEntry
      />
      <Button mode="contained" onPress={() => {}}>
        Login
      </Button>
    </View>
  );
};

export default SignIn;
