import { HomeScreen, SettingsScreen } from "@/app/(main)/(tabs)";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "@/store/store";
import "@/gesture-handler";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </Provider>
  );
}
