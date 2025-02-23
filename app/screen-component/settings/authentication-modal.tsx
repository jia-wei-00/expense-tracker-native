import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Authentication, setAuthentication } from "@/store/features/settings";
import SettingsModal from "./modal";
import { ModalProps, PropsWithSize } from "@/components/type";
import { useTranslation } from "react-i18next";

type AuthenticationModalProps = PropsWithSize & ModalProps;

export const useAuthenticationOptions = () => {
  const { t } = useTranslation();

  return [
    { label: t("Fingerprint"), value: "fingerprint" },
    { label: t("Face ID"), value: "face-id" },
    { label: t("Password"), value: "pin" },
    { label: t("None"), value: "none" },
  ];
};

const AuthenticationModal = ({ ...rest }: AuthenticationModalProps) => {
  const { authentication } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const handleChangeAuthentication = (value: string) => {
    dispatch(setAuthentication(value as Authentication));
  };

  return (
    <SettingsModal
      options={useAuthenticationOptions()}
      title="Authentication"
      value={authentication}
      onChange={handleChangeAuthentication}
      {...rest}
    />
  );
};

export default AuthenticationModal;
