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

export default function Index() {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue("Light", "Dark");
  const bg = useColorModeValue("warmGray.50", "coolGray.800");

  return (
    <Center>
      <Box>
        <Text fontSize="lg" display="flex" mb={20}>
          The active color mode is {""}
          <Text bold fontSize="18px">
            {text}
          </Text>
        </Text>
        <Button onPress={toggleColorMode} h={10}>
          Toggle
        </Button>
      </Box>
    </Center>
  );
}
