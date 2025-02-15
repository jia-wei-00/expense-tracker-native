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
import { CircleIcon } from "@/assets/Icons";
// import { useMMKVString } from "react-native-mmkv";
import { storage } from "@/store/mmkv";

type ThemeModalProps = React.ComponentProps<typeof Modal>;

const ThemeModal = ({ ...rest }: ThemeModalProps) => {
  const theme = storage.getString("theme");

  console.log(theme, "from mmkv");

  !theme && storage.set("theme", "system");

  const handleChangeTheme = (value: string) => {
    storage.set("theme", value);
    console.log(value);
  };

  return (
    <Modal {...rest}>
      <ModalBackdrop />
      <ModalContent>
        <ModalBody>
          <RadioGroup onChange={handleChangeTheme} value={theme}>
            <Radio value="light" className="flex">
              <RadioLabel className="flex-1">Light</RadioLabel>
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
            </Radio>
            <Radio value="dark" className="flex">
              <RadioLabel className="flex-1">Dark</RadioLabel>
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
            </Radio>
            <Radio value="system" className="flex">
              <RadioLabel className="flex-1">Follow System</RadioLabel>
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
            </Radio>
          </RadioGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ThemeModal;
