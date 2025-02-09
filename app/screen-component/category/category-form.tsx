import React from "react";
import { Control, FieldValues, UseFormReturn } from "react-hook-form";
import {
  DatePickerWithController,
  InputWithController,
  RadioWithController,
  SelectWithController,
} from "@/components";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Button, ButtonIcon } from "@/components/ui/button";
import { EditIcon } from "@/assets/Icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { CategorySchema } from "../home/schemes";
import { Category } from "@/store/features";

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
        placeholder="Name"
        name="name"
        label="Name"
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
          { label: "Expense", value: "true" },
          { label: "Income", value: "false" },
        ]}
        label="Transaction Type"
      />
    </VStack>
  );
};

export default CategoryForm;
