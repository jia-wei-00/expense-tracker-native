import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FontSize, setFontSize } from "@/store/features/settings";
import SettingsModal from "./modal";
import { ModalProps, PropsWithSize } from "@/components/type";
import { useTranslation } from "react-i18next";
type FontSizeModalProps = PropsWithSize & ModalProps;

export const fontSizeOptions = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

const FontSizeModal = ({ ...rest }: FontSizeModalProps) => {
  const { fontSize } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChangeFontSize = (value: string) => {
    dispatch(setFontSize(value as FontSize));
  };

  return (
    <SettingsModal
      options={fontSizeOptions.map((option) => ({
        ...option,
        label: t(option.label),
      }))}
      title={t("Font Size")}
      value={fontSize}
      onChange={handleChangeFontSize}
      {...rest}
    />
  );
};

export default FontSizeModal;
