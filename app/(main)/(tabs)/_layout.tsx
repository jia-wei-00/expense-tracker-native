import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, SettingsScreen } from "@/app/(main)/(tabs)";
import { Icon } from "@react-native-vector-icons/fontawesome6";

const Tab = createBottomTabNavigator({
  screens: {
    home: HomeScreen,
    settings: SettingsScreen,
  },
});

export default function TabLayout() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="rocket" size={30} color="#900" iconStyle="solid" />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
