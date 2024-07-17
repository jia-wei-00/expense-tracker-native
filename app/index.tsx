import useTheme from "@/hooks/useTheme";
import {
  Button,
  useColorMode,
  Text,
  useColorModeValue,
  Center,
  Box,
  Container,
} from "native-base";
import { Appearance } from "react-native";

export default function Index() {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue("Light", "Dark");
  const bg = useColorModeValue("warmGray.50", "coolGray.800");

  const handleButton = () => {
    toggleColorMode();
    Appearance.setColorScheme(colorMode);
  };

  return (
    <Center>
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "warmGray.50",
        }}
      >
        <Text fontSize="lg" display="flex" mb={20}>
          The active color mode is {""}
          <Text bold fontSize="18px">
            {text}
          </Text>
        </Text>
        <Button onPress={handleButton} h={10}>
          Toggle
        </Button>
      </Box>
    </Center>
  );
}
