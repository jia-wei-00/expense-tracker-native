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
            console.log("App is in background");
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
                setIsLocalAuthenticated(true);
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
      return setIsLocalAuthenticated(true);
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

  if (authentication !== "fingerprint") {
    return { handleBiometricAuth, isLocalAuthenticated: true };
  }

  return { handleBiometricAuth, isLocalAuthenticated };
};
