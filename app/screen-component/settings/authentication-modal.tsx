import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Authentication, setAuthentication } from "@/store/features/settings";
import SettingsModal from "./modal";
import { ModalProps, PropsWithSize } from "@/components/type";
import { useTranslation } from "react-i18next";
import * as LocalAuthentication from "expo-local-authentication";

type AuthenticationModalProps = PropsWithSize & ModalProps;

export const options = [
  { label: "Fingerprint", value: "fingerprint" },
  // { label: "Face ID", value: "face-id" },
  // { label: "Password", value: "pin" },
  { label: "None", value: "none" },
];

const AuthenticationModal = ({ ...rest }: AuthenticationModalProps) => {
  const { authentication } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChangeAuthentication = (value: string) => {
    dispatch(setAuthentication(value as Authentication));
  };

  const handleBiometricAuth = async (value: string) => {
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
        handleChangeAuthentication(value);
      }
    }
  };

  const onChange = (value: string) => {
    if (authentication === "fingerprint" || value === "fingerprint") {
      handleBiometricAuth(value);
    } else {
      handleChangeAuthentication(value);
    }
  };

  React.useEffect(() => {
    (async () => {
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

      if (!isBiometricAvailable) {
        options.splice(0, 1);
      }
    })();
  }, [authentication]);

  return (
    <SettingsModal
      options={options.map((option) => ({
        ...option,
        label: t(option.label),
      }))}
      title={t("Authentication")}
      value={authentication}
      onChange={onChange}
      {...rest}
    />
  );
};

export default AuthenticationModal;
