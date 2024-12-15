import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, SettingsScreen, LoginScreen } from "./screens";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { useAppSelector } from "./hooks/useRedux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Text } from "react-native-paper";
import { BottomBar, TabButton, TopBar } from "./components";
import { Animated, View } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  const userSession = useAppSelector((state) => state.auth.session);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userSession ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="App" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={({ ...props }) => <BottomBar {...props} />}
      screenOptions={{
        header: ({ route }) => (
          <TopBar
            title={route.name}
            rightIcon={{ icon: "account-details", onPress: () => {} }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon source="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => {
            return <Icon source="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
