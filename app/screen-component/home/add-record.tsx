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
import { Control, FieldValues, Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addRecordSchema, AddRecordSchema } from "./schemes";
import AddRecordForm from "./add-record-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addExpense, fetchCategory } from "@/store/features";

const AddRecord = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { category, loading } = useAppSelector((state) => state.category);
  const { session } = useAppSelector((state) => state.auth);
  const { isSubmitting } = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    session && !category.length && dispatch(fetchCategory(session.user.id));
  }, [session]);

  const {
    control,
    handleSubmit,
    getValues,
    formState,
    watch,
    resetField,
    reset,
  } = useForm<AddRecordSchema>({
    resolver: yupResolver(addRecordSchema) as Resolver<AddRecordSchema>,
    defaultValues: {
      spend_date: Date.now(),
    },
  });

  const onSubmit = (data: AddRecordSchema) => {
    session?.user.id &&
      dispatch(
        addExpense({
          ...data,
          user_id: session.user.id,
          created_at: new Date().toISOString(),
          category: Number(data.category),
          spend_date: new Date(data.spend_date).toISOString(),
        })
      ).then(() => {
        reset();
        setShowModal(false);
      });
  };

  return (
    <>
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>Add</ButtonText>
      </Button>
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
          <ModalBody>
            <AddRecordForm
              control={control as unknown as Control<FieldValues>}
              getValues={getValues}
              formState={formState}
              category={category}
              loading={loading}
              resetField={resetField}
              watch={watch}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="w-fit self-end mt-4"
              size="sm"
              onPress={handleSubmit(onSubmit)}
            >
              <ButtonText>
                {isSubmitting ? "Submitting..." : "Submit"}
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRecord;
