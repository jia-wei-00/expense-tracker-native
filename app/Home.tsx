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
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button mode="contained" onPress={toggleTheme} style={{ marginTop: 20 }}>
        {currentTheme}
      </Button>
    </View>
  );
};

export default Home;
