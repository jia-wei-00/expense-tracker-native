import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SettingsScreen, SignIn } from "@/app/(main)/(tabs)";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Appbar } from "react-native-paper";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ route, navigation }) => (
          <Appbar.Header>
            <Appbar.Content title={route.name} />
          </Appbar.Header>
        ),
      }}
    >
      <Tab.Screen
        name="Signin"
        component={SignIn}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
