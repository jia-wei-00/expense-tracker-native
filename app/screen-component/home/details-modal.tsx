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
import { CloseIcon } from "@/assets/Icons";
import AddRecordForm, { AddRecordFormProps } from "./add-record-form";
import { Button, ButtonText } from "@/components/ui/button";

interface DetailsModalProps extends AddRecordFormProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const DetailsModal = ({ showModal, setShowModal }: DetailsModalProps) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" className="text-typography-950">
            Add Record
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>{/* TODO: Add details */}</ModalBody>
        <ModalFooter>
          <Button
            className="w-fit self-end mt-4"
            size="sm"
            onPress={() => reset({ is_expense: undefined })}
          >
            <ButtonText>Clear</ButtonText>
          </Button>
          <Button
            className="w-fit self-end mt-4"
            size="sm"
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>{isSubmitting ? "Submitting..." : "Submit"}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailsModal;
