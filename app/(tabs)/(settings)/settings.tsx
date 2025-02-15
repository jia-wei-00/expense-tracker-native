import { ScreenContainer } from "@/components";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/features";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Item, ThemeModal } from "@/app/screen-component/settings";
import { useRouter } from "expo-router";

const Settings = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { session, isLoggingOut } = useAppSelector((state) => state.auth);
  const { user_metadata, email } = session!.user;
  const [showThemeModal, setShowThemeModal] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScreenContainer>
      <Item>
        <Avatar>
          <AvatarFallbackText>{user_metadata?.display_name}</AvatarFallbackText>
        </Avatar>
        <VStack>
          <Heading size="sm">{user_metadata?.display_name}</Heading>
          <Text size="sm">{email}</Text>
        </VStack>
      </Item>
      <Item
        items={[
          { label: "Font Size", iconLabel: "Small" },
          { label: "Language", iconLabel: "English" },
          {
            label: "Theme",
            iconLabel: "Dark",
            onPress: () => setShowThemeModal(true),
          },
        ]}
      />
      <Item
        items={[
          { label: "Authentication With", iconLabel: "Fingerprint" },
          { label: "Change Application Password" },
          { label: "Change Login Password" },
        ]}
      />
      <Item
        items={[
          {
            label: "Manage Expense Category",
            onPress: () => router.navigate("/category"),
          },
        ]}
      />
      <Item items={[{ label: "Clean Cache" }]} />
      <VStack space="md"></VStack>
      <Button onPress={handleLogout} variant="outline" action="negative">
        <ButtonText>{isLoggingOut ? "Logging Out..." : "Log Out"}</ButtonText>
      </Button>
      <Text size="xs" className="text-center text-gray-500">
        Version 1.0.0
      </Text>
      <ThemeModal
        size="md"
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
      />
    </ScreenContainer>
  );
};

export default Settings;
