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
import { createCategorySchema, CategorySchema } from "../home/schemes";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addCategory, fetchCategory, updateCategory } from "@/store/features";
import dayjs from "dayjs";
import colors from "tailwindcss/colors";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { ModalDefaultValues } from "../home/records";
import { CategoryForm } from "../category";
import { useTranslation } from "react-i18next";

interface RecordDetailsModalProps {
  showModal: boolean;
  defaultValues?: ModalDefaultValues;
  onClose?: () => void;
  type: "expense" | "category";
  setShowModal: (value: boolean) => void;
}

const AddCategoryModal = ({
  showModal,
  setShowModal,
  defaultValues,
  onClose,
  type,
}: RecordDetailsModalProps) => {
  const { category, isFetching, isAdding, isUpdating } = useAppSelector(
    (state) => state.category
  );
  const { session } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    session && !category.length && dispatch(fetchCategory(session.user.id));
  }, [session]);

  const categoryFormMethods = useForm<CategorySchema>({
    resolver: yupResolver(createCategorySchema(t)) as Resolver<CategorySchema>,
  });
  const {
    reset: resetCategory,
    handleSubmit: handleSubmitCategory,
    setValue: setValueCategory,
  } = categoryFormMethods;

  React.useEffect(() => {
    if (defaultValues) {
      resetCategory({
        name: "",
        is_expense: "",
      });
      setValueCategory("name", defaultValues?.name ?? "");
      setValueCategory("is_expense", defaultValues.is_expense ?? "");
    }
  }, [defaultValues]);

  const handleCloseModal = () => {
    if (defaultValues) {
      resetForm();
    }
    onClose && onClose();
  };

  const resetForm = () => {
    resetCategory({
      name: "",
      is_expense: "",
    });
  };

  const handleDisableSubmit = (data: CategorySchema) => {
    if (!defaultValues) return false;
    if (isAdding || isUpdating) return true;

    const { id, created_at, ...rest } = defaultValues;
    return Object.keys(rest).every((key) => {
      return (
        defaultValues[key as keyof typeof defaultValues] ===
        data[key as keyof typeof data]
      );
    });
  };

  const onSubmit = async (data: CategorySchema) => {
    if (session?.user.id) {
      try {
        if (handleDisableSubmit(data)) return;
        if (defaultValues) {
          await dispatch(
            updateCategory({
              ...data,
              id: Number(defaultValues.id),
              is_expense: data.is_expense === "true",
              user_id: session.user.id,
              created_at: new Date().toISOString(),
            })
          );
        } else {
          await dispatch(
            addCategory({
              ...data,
              is_expense: data.is_expense === "true",
              user_id: session.user.id,
              created_at: new Date().toISOString(),
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
    resetCategory({
      name: "",
      is_expense: "",
    });
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={handleCloseModal}
      closeOnOverlayClick={!isAdding && !isUpdating}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" className="text-typography-950">
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
          <CategoryForm
            allFormMethods={categoryFormMethods}
            category={category}
            loading={isFetching}
            isReadOnly={!!defaultValues?.created_at}
            setShowModal={setShowModal}
            onClose={handleCloseModal}
          />
          {defaultValues?.created_at && (
            <FormControl isRequired={true} size="sm">
              <FormControlLabel>
                <FormControlLabelText className="dark:text-zinc-400">
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
              disabled={isAdding || isUpdating}
            >
              <ButtonText>{t("Clear")}</ButtonText>
            </Button>
            <Button
              className="mt-4"
              size="sm"
              onPress={handleSubmitCategory(onSubmit)}
              disabled={handleDisableSubmit(categoryFormMethods.watch())}
            >
              {(isAdding || isUpdating) && (
                <ButtonSpinner color={colors.gray[700]} />
              )}
              <ButtonText>
                {isAdding || isUpdating ? t("Submitting...") : t("Submit")}
              </ButtonText>
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModal;
