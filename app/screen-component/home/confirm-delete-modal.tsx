import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { TrashIcon } from "@/assets/Icons";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import React from "react";
import { Text } from "@/components";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import colors from "tailwindcss/colors";
import { useTranslation } from "react-i18next";

interface ConfirmDeleteModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  name: string;
  onClose?: () => void;
  onConfirmDelete?: () => void;
  isDeleting: boolean;
}

const ConfirmDeleteModal = ({
  showModal,
  setShowModal,
  name,
  onClose,
  onConfirmDelete,
  isDeleting,
}: ConfirmDeleteModalProps) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    onClose?.();
    onConfirmDelete?.();
    setShowModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
        onClose?.();
      }}
    >
      <ModalBackdrop />
      <ModalContent className="max-w-[305px] items-center">
        <ModalHeader>
          <Box className="w-[56px] h-[56px] rounded-full bg-background-error items-center justify-center">
            <Icon as={TrashIcon} className="stroke-error-600" size="xl" />
          </Box>
        </ModalHeader>
        <ModalBody className="mt-0 mb-4">
          <Heading size="md" className="text-typography-950 mb-2 text-center">
            {t("Delete")} {name}
          </Heading>
          <Text.Normal className="text-center">
            {t(
              "Are you sure you want to delete this record? This action cannot be undone."
            )}
          </Text.Normal>
        </ModalBody>
        <ModalFooter className="w-full">
          <Button
            variant="outline"
            action="secondary"
            size="sm"
            onPress={() => {
              setShowModal(false);
              onClose?.();
            }}
            className="flex-grow"
          >
            <ButtonText>{t("Cancel")}</ButtonText>
          </Button>
          <Button onPress={handleDelete} size="sm" className="flex-grow">
            {isDeleting && <ButtonSpinner color={colors.gray[700]} />}
            <ButtonText>
              {isDeleting ? t("Deleting...") : t("Delete")}
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
