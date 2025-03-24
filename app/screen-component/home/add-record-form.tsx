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
import { AddRecordSchema } from "./schemes";
import { Button, ButtonIcon } from "@/components/ui/button";
import { EditIcon } from "@/assets/Icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Category } from "@/store/features";
import { useTranslation } from "react-i18next";

export interface AddRecordFormProps {
  category: Category[];
  loading: boolean;
  allFormMethods: UseFormReturn<AddRecordSchema>;
  isReadOnly?: boolean;
  setShowModal: (showModal: boolean) => void;
  onClose?: () => void;
}

const AddRecordForm = ({
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
  const { i18n } = useTranslation();

  const translateY = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleEditCategory = (isOpen: "open" | "close") => {
    if (isOpen === "open") {
      setTimeout(() => {
        translateY.value = withSpring(0, {
          duration: 1000,
        });
      }, 500);
    } else {
      translateY.value = 100;
    }
  };

  const control = controlWithController as unknown as Control<FieldValues>;
  const isExpense = watch("is_expense") as unknown as string;

  const { t } = useTranslation();

  const filteredCategory = React.useMemo(() => {
    const filteredTransactionType = category.filter((item) => {
      return item.is_expense === (isExpense === "true");
    });

    return filteredTransactionType.map((item) => ({
      label: item.name ?? "",
      value: item.id?.toString() ?? "",
    }));
  }, [category, isExpense]);

  const router = useRouter();

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
      <InputWithController
        control={control}
        errors={errors.amount?.message}
        required={true}
        isReadOnly={isReadOnly}
        placeholder={t("Amount")}
        name="amount"
        keyboardType="numeric"
        inputMode="decimal"
        label={t("Amount")}
      />
      <DatePickerWithController
        control={control}
        errors={errors.spend_date?.message}
        required={true}
        isReadOnly={isReadOnly}
        name="spend_date"
        inputProps={{ placeholder: t("Date") }}
        label={t("Date")}
        datePickerProps={{
          locale: i18n.language,
          value: new Date(),
        }}
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
        onChange={() => {
          resetField("category");
        }}
        label={t("Transaction Type")}
      />
      {isExpense && (
        <>
          <Divider />
          <SelectWithController
            isReadOnly={isReadOnly}
            control={control}
            errors={errors.category?.message}
            required={true}
            name="category"
            placeholder={t("Category")}
            options={filteredCategory}
            loading={loading}
            label={t("Category")}
            onOpen={() => handleEditCategory("open")}
            onClose={() => handleEditCategory("close")}
          >
            <Animated.View style={[animatedStyle]}>
              <Button
                onPress={() => {
                  router.navigate("/category");
                  setShowModal(false);
                  onClose?.();
                }}
                className="flex-row items-center justify-end absolute bottom-2 right-2 p-3"
              >
                <ButtonIcon as={EditIcon} />
              </Button>
            </Animated.View>
          </SelectWithController>
        </>
      )}
    </VStack>
  );
};

export default AddRecordForm;
