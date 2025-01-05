// import { createStackNavigator } from "@react-navigation/stack";
// import {
//   HomeScreen,
//   SettingsScreen,
//   LoginScreen,
//   HistoryScreen,
// } from "./screens";
// import { NavigationContainer } from "@react-navigation/native";
// import { useAppSelector } from "./hooks/useRedux";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { BottomBar, TopBar } from "./components";
// import { CardIcon, HistoryIcon, HomeIcon } from "./assets/icons";

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const StackNavigator = () => {
//   const userSession = true;

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {!userSession ? (
//         <Stack.Screen name="Login" component={LoginScreen} />
//       ) : (
//         <Stack.Screen name="App" component={TabNavigator} />
//       )}
//     </Stack.Navigator>
//   );
// };

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       tabBar={({ ...props }) => <BottomBar {...props} />}
//       screenOptions={{
//         header: ({ route }) => (
//           <TopBar
//             title={route.name}
//             rightIcon={{ icon: "account-details", onPress: () => {} }}
//           />
//         ),
//         tabBarActiveTintColor: "blue",
//         tabBarInactiveTintColor: "gray",
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <HomeIcon width={size} height={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="History"
//         component={HistoryScreen}
//         options={{
//           tabBarLabel: "History",
//           tabBarIcon: ({ color, size }) => (
//             <HistoryIcon width={size} height={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{
//           tabBarLabel: "Settings",
//           tabBarIcon: ({ color, size }) => (
//             <CardIcon width={size} height={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const Navigator = () => {
//   return (
//     <NavigationContainer>
//       <StackNavigator />
//     </NavigationContainer>
//   );
// };

// export default Navigator;
