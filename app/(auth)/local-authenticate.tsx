import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { ScreenContainer, Text } from "@/components";
import { Center } from "@/components/ui/center";
import { VStack } from "@/components/ui/vstack";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

const LocalAuthenticate = ({
  handleLocalAuthenticate,
}: {
  handleLocalAuthenticate: () => Promise<void>;
}) => {
  const { t } = useTranslation();

  return (
    <Center className="h-screen">
      <Pressable onPress={handleLocalAuthenticate}>
        <VStack space="lg">
          <Center>
            <Entypo name="fingerprint" size={50} color="white" />
          </Center>
          <Text.Caption>{t("Tap to unlock")}</Text.Caption>
        </VStack>
      </Pressable>
    </Center>
  );
};

export default LocalAuthenticate;
