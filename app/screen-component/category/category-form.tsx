import React from "react";
import { Control, FieldValues, UseFormReturn } from "react-hook-form";
import { InputWithController, RadioWithController } from "@/components";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Button, ButtonIcon } from "@/components/ui/button";
import { EditIcon } from "@/assets/Icons";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { CategorySchema } from "../home/schemes";
import { Category } from "@/store/features";
import { useTranslation } from "react-i18next";

export interface AddRecordFormProps {
  category: Category[];
  loading: boolean;
  allFormMethods: UseFormReturn<CategorySchema>;
  isReadOnly?: boolean;
  setShowModal: (showModal: boolean) => void;
  onClose?: () => void;
}

const CategoryForm = ({
  allFormMethods,
  category,
  loading,
  isReadOnly = false,
  setShowModal,
  onClose,
}: AddRecordFormProps) => {
  const {
    control: controlWithController,
    formState,
    watch,
    resetField,
  } = allFormMethods;
  const { errors } = formState;

  const translateY = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const control = controlWithController as unknown as Control<FieldValues>;
  const isExpense = watch("is_expense") as unknown as string;

  const { t } = useTranslation();

  const filteredCategory = React.useMemo(() => {
    const filteredTransactionType = category.filter((item) => {
      return item.is_expense;
    });

    return filteredTransactionType.map((item) => ({
      label: item.name ?? "",
      value: item.id?.toString() ?? "",
    }));
  }, [category, isExpense]);

  return (
    <VStack space="lg" className="py-4">
      <InputWithController
        control={control}
        errors={errors.name?.message}
        required={true}
        isReadOnly={isReadOnly}
        placeholder={t("Name")}
        name="name"
        label={t("Name")}
      />
      <RadioWithController
        control={control}
        errors={errors.is_expense?.message}
        required={true}
        isReadOnly={isReadOnly}
        name="is_expense"
        value="Expense"
        className="pt-1"
        options={[
          { label: t("Expense"), value: "true" },
          { label: t("Income"), value: "false" },
        ]}
        label={t("Transaction Type")}
      />
    </VStack>
  );
};

export default CategoryForm;
