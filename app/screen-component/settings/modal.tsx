import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import React from "react";
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import { CheckedIcon, CircleIcon } from "@/assets/Icons";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components";

interface SettingsModalProps extends React.ComponentProps<typeof Modal> {
  options: { label: string; value: string }[];
  title: string;
  value: string;
  onChange: (value: string) => void;
  onPress?: (value: string) => void;
}

const SettingsModal = ({
  options,
  title,
  value,
  onChange,
  onPress,
  ...rest
}: SettingsModalProps) => {
  return (
    <Modal {...rest}>
      <ModalBackdrop />
      <ModalContent className="bg-background-0">
        <ModalHeader className="mb-2">
          <Text.Title>{title}</Text.Title>
        </ModalHeader>
        <ModalBody>
          <RadioGroup onChange={onChange} value={value}>
            {options.map((option, key) => (
              <Radio
                value={option.value}
                key={key}
                className="flex p-3 bg-background-50 rounded-md"
                size="sm"
                onPress={() => onPress?.(option.value)}
              >
                <RadioLabel className="flex-1 text-secondary-0">
                  {option.label}
                </RadioLabel>
                <RadioIndicator>
                  {value === option.value ? (
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

export default SettingsModal;
