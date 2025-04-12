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
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addRecordSchema,
  AddRecordSchema,
  categorySchema,
  CategorySchema,
} from "./schemes";
import AddRecordForm from "./add-record-form";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addExpense, fetchCategory, updateExpense } from "@/store/features";
import dayjs from "dayjs";
import colors from "tailwindcss/colors";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { ModalDefaultValues } from "./records";
import { CategoryForm } from "../category";
import { useTranslation } from "react-i18next";

interface RecordDetailsModalProps {
  showModal: boolean;
  defaultValues?: ModalDefaultValues;
  onClose?: () => void;
  type: "expense" | "category";
  setShowModal: (value: boolean) => void;
}

const RecordDetailsModal = ({
  showModal,
  setShowModal,
  defaultValues,
  onClose,
  type,
}: RecordDetailsModalProps) => {
  const { category, isFetching } = useAppSelector((state) => state.category);
  const { session } = useAppSelector((state) => state.auth);
  const { isSubmitting, isUpdating } = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    session && !category.length && dispatch(fetchCategory(session.user.id));
  }, [session]);

  const recordFormMethods = useForm<AddRecordSchema>({
    resolver: yupResolver(addRecordSchema) as Resolver<AddRecordSchema>,
    defaultValues: {
      spend_date: dayjs().valueOf(),
    },
  });
  const { reset, handleSubmit, setValue } = recordFormMethods;

  const categoryFormMethods = useForm<CategorySchema>({
    resolver: yupResolver(categorySchema) as Resolver<CategorySchema>,
  });
  const {
    reset: resetCategory,
    handleSubmit: handleSubmitCategory,
    setValue: setValueCategory,
  } = categoryFormMethods;

  React.useEffect(() => {
    if (defaultValues) {
      if (type === "expense") {
        reset({
          name: "",
          is_expense: "",
          amount: 0,
          category: "",
          spend_date: dayjs().valueOf(),
        });
        setValue("name", defaultValues?.name ?? "");
        setValue("is_expense", defaultValues.is_expense ?? "");
        setValue("amount", defaultValues?.amount ?? 0);
        setValue("category", defaultValues.category ?? "");
        setValue("spend_date", defaultValues.spend_date ?? dayjs().valueOf());
      } else {
        resetCategory({
          name: "",
          is_expense: "",
        });
        setValueCategory("name", defaultValues?.name ?? "");
        setValueCategory("is_expense", defaultValues.is_expense ?? "");
      }
    }
  }, [defaultValues]);

  const handleCloseModal = () => {
    if (defaultValues) {
      resetForm();
    }
    onClose && onClose();
  };

  const resetForm = () => {
    if (type === "expense") {
      reset({
        name: "",
        is_expense: "",
        amount: 0,
        category: "",
        spend_date: dayjs().valueOf(),
      });
    } else {
      resetCategory({
        name: "",
        is_expense: "",
      });
    }
  };

  const handleDisableSubmit = (data: AddRecordSchema) => {
    if (!defaultValues) return false;
    if (isSubmitting || isUpdating) return true;

    const { id, created_at, ...rest } = defaultValues;
    return Object.keys(rest).every((key) => {
      return (
        defaultValues[key as keyof typeof defaultValues] ===
        data[key as keyof typeof data]
      );
    });
  };

  const onSubmit = async (data: AddRecordSchema) => {
    if (session?.user.id) {
      try {
        if (handleDisableSubmit(data)) return;
        if (defaultValues) {
          await dispatch(
            updateExpense({
              ...data,
              id: Number(defaultValues.id),
              is_expense: data.is_expense === "true",
              user_id: session.user.id,
              created_at: new Date().toISOString(),
              category: Number(data.category),
              spend_date: new Date(data.spend_date).toISOString(),
            })
          );
        } else {
          await dispatch(
            addExpense({
              ...data,
              is_expense: data.is_expense === "true",
              user_id: session.user.id,
              created_at: new Date().toISOString(),
              category: Number(data.category),
              spend_date: new Date(data.spend_date).toISOString(),
            })
          );
          resetForm();
        }

        handleCloseModal();
      } catch (error) {
        console.error("Failed to add or update expense:", error);
      }
    }
  };

  const handleClear = () => {
    if (type === "expense") {
      reset({
        name: "",
        is_expense: "",
        amount: 0,
        category: "",
        spend_date: dayjs().valueOf(),
      });
    } else {
      resetCategory({
        name: "",
        is_expense: "",
      });
    }
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={handleCloseModal}
      closeOnOverlayClick={!isSubmitting && !isUpdating}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" className="text-secondary-0">
            {defaultValues
              ? defaultValues.created_at
                ? t("View")
                : t("Edit")
              : t("Add")}
            {t("Record")}
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
          {type === "expense" ? (
            <AddRecordForm
              allFormMethods={recordFormMethods}
              category={category}
              loading={isFetching}
              isReadOnly={!!defaultValues?.created_at}
              setShowModal={setShowModal}
              onClose={handleCloseModal}
            />
          ) : (
            <CategoryForm
              allFormMethods={categoryFormMethods}
              category={category}
              loading={isFetching}
              isReadOnly={!!defaultValues?.created_at}
              setShowModal={setShowModal}
              onClose={handleCloseModal}
            />
          )}
          {defaultValues?.created_at && (
            <FormControl isRequired={true} size="sm">
              <FormControlLabel>
                <FormControlLabelText className="text-secondary-0">
                  {t("Created At")}
                </FormControlLabelText>
              </FormControlLabel>
              <Input className="text-center" size="sm" isReadOnly={true}>
                <InputField
                  value={dayjs(defaultValues?.created_at).format("DD/MM/YYYY")}
                  placeholder={t("Created At")}
                />
                <InputSlot className="pr-3">
                  <InputIcon as={CalendarIcon} />
                </InputSlot>
              </Input>
            </FormControl>
          )}
        </ModalBody>
        {!defaultValues?.created_at && (
          <ModalFooter>
            <Button
              className="w-fit self-end mt-4"
              size="sm"
              onPress={handleClear}
              disabled={isSubmitting || isUpdating}
            >
              <ButtonText>{t("Clear")}</ButtonText>
            </Button>
            <Button
              className="mt-4"
              size="sm"
              onPress={handleSubmit(onSubmit)}
              disabled={handleDisableSubmit(recordFormMethods.watch())}
            >
              {(isSubmitting || isUpdating) && (
                <ButtonSpinner color={colors.gray[700]} />
              )}
              <ButtonText>
                {isSubmitting || isUpdating ? t("Submitting...") : t("Submit")}
              </ButtonText>
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RecordDetailsModal;
