import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Menu } from "@/components";
import { HistoryIcon, HomeIcon, UserIcon } from "@/assets/Icons";
import TabBar from "@/components/tab-bar";
import { Icon } from "@/components/ui/icon";
import { useTranslation } from "react-i18next";
import LocalAuthenticate from "../(auth)/local-authenticate";
import { useAppSelector } from "@/hooks/useRedux";
import { useHandleBiometricAuth } from "@/utils";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { t } = useTranslation();
  const { authentication } = useAppSelector((state) => state.settings);
  const { handleBiometricAuth, isLocalAuthenticated } = useHandleBiometricAuth({
    authentication,
  });

  return (
    <>
      {authentication === "fingerprint" && !isLocalAuthenticated && (
        <LocalAuthenticate handleLocalAuthenticate={handleBiometricAuth} />
      )}
      <Tabs
        screenOptions={{
          headerRight: () => <Menu />,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, false),
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("Home"),
            tabBarIcon: ({ color }) => <Icon as={HomeIcon} className={color} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: t("History"),
            tabBarIcon: ({ color }) => (
              <Icon as={HistoryIcon} className={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="loan"
          options={{
            title: t("Loan"),
            tabBarIcon: ({ color }) => <Icon as={UserIcon} className={color} />,
          }}
        />
        <Tabs.Screen
          name="(settings)"
          options={{
            title: t("Settings"),
            tabBarIcon: ({ color }) => <Icon as={UserIcon} className={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
