import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
} from "@/components/ui/modal";
import React from "react";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { CheckedIcon, CircleIcon } from "@/assets/Icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setTheme, ThemeState } from "@/store/features/theme/theme-slice";
import { Icon } from "@/components/ui/icon";

interface ThemeModalProps extends React.ComponentProps<typeof Modal> {}

const themeOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Follow System", value: "system" },
];

const ThemeModal = ({ ...rest }: ThemeModalProps) => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleChangeTheme = (value: ThemeState["theme"]) => {
    dispatch(setTheme(value));
  };

  return (
    <Modal {...rest}>
      <ModalBackdrop />
      <ModalContent>
        <ModalBody>
          <RadioGroup onChange={handleChangeTheme} value={theme}>
            {themeOptions.map((option) => (
              <Radio value={option.value} className="flex">
                <RadioLabel className="flex-1">{option.label}</RadioLabel>
                <RadioIndicator>
                  {theme === option.value ? (
                    <Icon as={CheckedIcon} />
                  ) : (
                    <Icon as={CircleIcon} />
                  )}
                </RadioIndicator>
              </Radio>
            ))}
          </RadioGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ThemeModal;
