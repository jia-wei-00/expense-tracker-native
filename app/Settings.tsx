import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import useCustomTheme from "@/hooks/useTheme";

const Home = () => {
  const { currentTheme, toggleTheme } = useCustomTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Settings</Text>
    </View>
  );
};

export default Home;
