import React from "react";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { CalendarIcon, CloseIcon } from "@/assets/Icons";
import dayjs from "dayjs";
import colors from "tailwindcss/colors";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";

interface ModalFormProps {
  showModal: boolean;
  onClose?: () => void;
  modalTitle: string;
  children: React.ReactNode;
  disabled?: boolean;
  resetOnPress: () => void;
  submitOnPress: () => void;
  isSubmitting?: boolean;
  createdAt?: string;
}

const ModalForm = ({
  showModal,
  onClose,
  modalTitle,
  children,
  disabled = false,
  resetOnPress,
  submitOnPress,
  isSubmitting = false,
  createdAt,
}: ModalFormProps) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={onClose}
      closeOnOverlayClick={!isSubmitting}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" className="text-typography-950">
            {modalTitle}
            Record
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          {children}
          {createdAt && (
            <FormControl isRequired={true} size="sm">
              <FormControlLabel>
                <FormControlLabelText className="dark:text-zinc-400">
                  Created At
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="text-center" size="sm" isReadOnly={true}>
                <InputField
                  value={dayjs(createdAt).format("DD/MM/YYYY")}
                  placeholder="Created At"
                />
                <InputSlot className="pr-3">
                  <InputIcon as={CalendarIcon} />
                </InputSlot>
              </Input>
            </FormControl>
          )}
        </ModalBody>
        {!createdAt && (
          <ModalFooter>
            <Button
              className="w-fit self-end mt-4"
              size="sm"
              onPress={resetOnPress}
              disabled={disabled}
            >
              <ButtonText>Clear</ButtonText>
            </Button>
            <Button
              className="mt-4"
              size="sm"
              onPress={submitOnPress}
              disabled={disabled}
            >
              {isSubmitting && <ButtonSpinner color={colors.gray[700]} />}
              <ButtonText>
                {isSubmitting ? "Submitting..." : "Submit"}
              </ButtonText>
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
