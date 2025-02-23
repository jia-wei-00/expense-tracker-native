import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { FontSize, setFontSize } from "@/store/features/settings";
import SettingsModal from "./modal";
import { ModalProps, PropsWithSize } from "@/components/type";

type FontSizeModalProps = PropsWithSize & ModalProps;

export const fontSizeOptions = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

const FontSizeModal = ({ ...rest }: FontSizeModalProps) => {
  const { fontSize } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const handleChangeFontSize = (value: string) => {
    dispatch(setFontSize(value as FontSize));
  };

  return (
    <SettingsModal
      options={fontSizeOptions}
      title="Font Size"
      value={fontSize}
      onChange={handleChangeFontSize}
      {...rest}
    />
  );
};

export default FontSizeModal;
