import { ScreenContainer } from "@/components";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/features";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import {
  AuthenticationModal,
  FontSizeModal,
  Item,
  LanguageModal,
  ThemeModal,
} from "@/app/screen-component/settings";
import { useRouter } from "expo-router";
import { languageOptions } from "@/app/screen-component/settings/language-modal";
import { fontSizeOptions } from "@/app/screen-component/settings/font-size-modal";
import { options } from "@/app/screen-component/settings/authentication-modal";
import { useTranslation } from "react-i18next";
import { themeOptions } from "@/app/screen-component/settings/theme-modal";

const Settings = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { session, isLoggingOut } = useAppSelector((state) => state.auth);
  const { theme, language, fontSize, authentication } = useAppSelector(
    (state) => state.settings
  );
  const { user_metadata, email } = session?.user || {};
  const [showThemeModal, setShowThemeModal] = React.useState(false);
  const [showLanguageModal, setShowLanguageModal] = React.useState(false);
  const [showFontSizeModal, setShowFontSizeModal] = React.useState(false);
  const [showAuthenticationModal, setShowAuthenticationModal] =
    React.useState(false);
  const { t } = useTranslation();
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
          {
            label: t("Font Size"),
            iconLabel: t(
              fontSizeOptions.find((option) => option.value === fontSize)
                ?.label || ""
            ),
            onPress: () => setShowFontSizeModal(true),
          },
          {
            label: t("Language"),
            iconLabel: t(
              languageOptions.find((option) => option.value === language)
                ?.label || ""
            ),
            onPress: () => setShowLanguageModal(true),
          },
          {
            label: t("Theme"),
            iconLabel: t(
              themeOptions.find((option) => option.value === theme)
                ?.smallLabel || ""
            ),
            onPress: () => setShowThemeModal(true),
          },
        ]}
      />
      <Item
        items={[
          {
            label: t("Authentication With"),
            iconLabel: t(
              options.find((option) => option.value === authentication)
                ?.label || ""
            ),
            onPress: () => setShowAuthenticationModal(true),
          },
          { label: t("Change Login Password") },
        ]}
      />
      <Item
        items={[
          {
            label: t("Manage Expense Category"),
            onPress: () => router.navigate("/category"),
          },
        ]}
      />
      <Item items={[{ label: t("Clean Cache") }]} />
      <VStack space="md"></VStack>
      <Button onPress={handleLogout} variant="outline" action="negative">
        <ButtonText>
          {isLoggingOut ? t("Logging Out...") : t("Log Out")}
        </ButtonText>
      </Button>
      <Text size="xs" className="text-center text-gray-500">
        {t("Version 1.0.0")}
      </Text>
      <ThemeModal
        size={fontSize}
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
      />
      <LanguageModal
        size={fontSize}
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
      <FontSizeModal
        size={fontSize}
        isOpen={showFontSizeModal}
        onClose={() => setShowFontSizeModal(false)}
      />
      <AuthenticationModal
        size={fontSize}
        isOpen={showAuthenticationModal}
        onClose={() => setShowAuthenticationModal(false)}
      />
    </ScreenContainer>
  );
};

export default Settings;
