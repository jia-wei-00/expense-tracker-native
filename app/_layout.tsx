import TabLayout from "@/app/(main)/(tabs)/_layout";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "@/store";
import "@/gesture-handler";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="(tabs)"
          component={TabLayout}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Provider>
  );
}
