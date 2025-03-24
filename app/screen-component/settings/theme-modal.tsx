import { SettingsModal } from "@/app/screen-component/settings";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setTheme, Theme } from "@/store/features/settings";
import { ModalProps, PropsWithSize } from "@/components/type";
import { useTranslation } from "react-i18next";

type ThemeModalProps = PropsWithSize & ModalProps;

export const themeOptions = [
  { label: "Light", value: "light", smallLabel: "Light" },
  { label: "Dark", value: "dark", smallLabel: "Dark" },
  { label: "Follow System", value: "system", smallLabel: "System" },
];

const ThemeModal = ({ ...rest }: ThemeModalProps) => {
  const { theme } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handleChangeTheme = (value: string) => {
    dispatch(setTheme(value as Theme));
  };

  return (
    <SettingsModal
      options={themeOptions.map((option) => ({
        ...option,
        label: t(option.label),
      }))}
      title={t("Theme")}
      value={theme}
      onChange={handleChangeTheme}
      {...rest}
    />
  );
};

export default ThemeModal;
