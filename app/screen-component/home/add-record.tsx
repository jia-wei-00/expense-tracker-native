import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
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
import { DefaultValues, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addRecordSchema, AddRecordSchema } from "./schemes";
import AddRecordForm from "./add-record-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addExpense, fetchCategory } from "@/store/features";
import dayjs from "dayjs";

interface RecordDetailsModalProps {
  showModal: boolean;
  defaultValues?: DefaultValues<AddRecordSchema>;
  onClose?: () => void;
  setShowModal: (value: boolean) => void;
}

const RecordDetailsModal = ({
  showModal,
  defaultValues,
  onClose,
}: RecordDetailsModalProps) => {
  const { category, loading } = useAppSelector((state) => state.category);
  const { session } = useAppSelector((state) => state.auth);
  const { isSubmitting } = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    session && !category.length && dispatch(fetchCategory(session.user.id));

    if (defaultValues) {
      reset({
        name: defaultValues.name,
        amount: defaultValues.amount,
        is_expense: defaultValues.is_expense,
        category: defaultValues.category,
        spend_date: dayjs(defaultValues.spend_date).valueOf(),
      });
    }
  }, [session]);

  const formMethods = useForm<AddRecordSchema>({
    resolver: yupResolver(addRecordSchema) as Resolver<AddRecordSchema>,
    defaultValues: {
      spend_date: dayjs().valueOf(),
    },
  });
  const { reset, handleSubmit, setValue } = formMethods;

  React.useEffect(() => {
    if (defaultValues) {
      setValue("name", defaultValues?.name ?? "");
      setValue("amount", defaultValues.amount ?? 0);
      setValue("is_expense", defaultValues.is_expense ?? "");
      setValue("category", defaultValues.category ?? "");
      setValue("spend_date", defaultValues.spend_date ?? dayjs().valueOf());
    }
  }, [defaultValues]);

  const handleCloseModal = () => {
    if (defaultValues) {
      reset({ is_expense: "", amount: 0 });
    }
    onClose && onClose();
  };

  const onSubmit = (data: AddRecordSchema) => {
    session?.user.id &&
      dispatch(
        addExpense({
          ...data,
          is_expense: data.is_expense === "true",
          user_id: session.user.id,
          created_at: new Date().toISOString(),
          category: Number(data.category),
          spend_date: new Date(data.spend_date).toISOString(),
        })
      ).then(() => {
        reset({ is_expense: "", amount: 0 });
        handleCloseModal();
      });
  };

  return (
    <Modal isOpen={showModal} onClose={handleCloseModal} size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" className="text-typography-950">
            {defaultValues ? "Edit" : "Add"} Record
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
          <AddRecordForm
            allFormMethods={formMethods}
            category={category}
            loading={loading}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-fit self-end mt-4"
            size="sm"
            onPress={() => reset({ is_expense: "", amount: 0 })}
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

export default RecordDetailsModal;
