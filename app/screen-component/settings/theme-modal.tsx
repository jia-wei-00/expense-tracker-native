import { SettingsModal } from "@/app/screen-component/settings";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setTheme, Theme } from "@/store/features/settings";
import { ModalProps, PropsWithSize } from "@/components/type";

type ThemeModalProps = PropsWithSize & ModalProps;

const themeOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Follow System", value: "system" },
];

const ThemeModal = ({ ...rest }: ThemeModalProps) => {
  const { theme } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  const handleChangeTheme = (value: string) => {
    dispatch(setTheme(value as Theme));
  };

  return (
    <SettingsModal
      options={themeOptions}
      title="Theme"
      value={theme}
      onChange={handleChangeTheme}
      {...rest}
    />
  );
};

export default ThemeModal;
