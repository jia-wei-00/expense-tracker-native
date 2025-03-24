import * as LocalAuthentication from "expo-local-authentication";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect } from "react";
import { AppState } from "react-native";
import { Authentication } from "@/store/features/settings";

interface BiometricAuthProps {
  authentication: Authentication;
}

export const useHandleBiometricAuth = ({
  authentication,
}: BiometricAuthProps) => {
  const { t } = useTranslation();
  const [isLocalAuthenticated, setIsLocalAuthenticated] = useState(false);

  useEffect(() => {
    if (authentication === "fingerprint") {
      const subscription = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (nextAppState === "background") {
            setIsLocalAuthenticated(false);
          }

          if (nextAppState === "active") {
            console.log("Checking biometric support");
            (async () => {
              const isBiometricAvailable =
                await LocalAuthentication.hasHardwareAsync();

              if (isBiometricAvailable) {
                handleBiometricAuth();
              } else {
                console.log("Biometric not supported");
              }
            })();
          }
        }
      );

      return () => {
        subscription.remove();
      };
    } else {
      setIsLocalAuthenticated(true);
    }
  }, [authentication]);

  const handleBiometricAuth = useCallback(async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricAvailable) {
      return console.log("Biometric not supported");
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: t("Authenticate with biometric"),
      cancelLabel: t("Cancel"),
    });

    if (biometricAuth) {
      if (biometricAuth.success) {
        console.log("Biometric authentication successful");
        setIsLocalAuthenticated(true);
      }
    }
  }, [t]);

  return { handleBiometricAuth, isLocalAuthenticated };
};
