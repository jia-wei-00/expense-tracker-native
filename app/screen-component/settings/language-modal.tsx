import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setLanguage, Language } from "@/store/features/settings";
import SettingsModal from "./modal";
import { ModalProps, PropsWithSize } from "@/components/type";
import { useTranslation } from "react-i18next";

type LanguageModalProps = PropsWithSize & ModalProps;

export const languageOptions = [
  { label: "English", value: "en-US" },
  { label: "简体中文", value: "zh-CN" },
  { label: "繁體中文", value: "zh-TW" },
];

const LanguageModal = ({ ...rest }: LanguageModalProps) => {
  const { language } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const handleChangeLanguage = (value: string) => {
    dispatch(setLanguage(value as Language));
  };

  const { i18n, t } = useTranslation();

  React.useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  return (
    <SettingsModal
      options={languageOptions}
      title={t("Language")}
      value={language}
      onChange={handleChangeLanguage}
      {...rest}
    />
  );
};

export default LanguageModal;
