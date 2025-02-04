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
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { deleteExpense } from "@/store/features";
import colors from "tailwindcss/colors";

interface ConfirmDeleteModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  data?: {
    id: number;
    name: string;
  };
  onClose?: () => void;
  type: "expense" | "category";
}

const ConfirmDeleteModal = ({
  showModal,
  setShowModal,
  data,
  onClose,
  type,
}: ConfirmDeleteModalProps) => {
  const dispatch = useAppDispatch();
  const expenseData = useAppSelector((state) => state.expense);
  const { isDeleting } = expenseData;

  const handleDelete = () => {
    data?.id && dispatch(deleteExpense(Number(data.id)));
    onClose?.();
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
            Delete {data?.name}
          </Heading>
          <Text.Normal className="text-center">
            Are you sure you want to delete this record? This action cannot be
            undone.
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
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button onPress={handleDelete} size="sm" className="flex-grow">
            {isDeleting && <ButtonSpinner color={colors.gray[700]} />}
            <ButtonText>{isDeleting ? "Deleting..." : "Delete"}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
