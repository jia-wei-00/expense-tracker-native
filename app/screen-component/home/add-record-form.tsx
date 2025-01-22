import React from "react";
import {
  Control,
  FieldValues,
  FormState,
  UseFormGetValues,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";
import {
  DatePickerWithController,
  InputWithController,
  RadioWithController,
  SelectWithController,
} from "@/components";
import { AddRecordSchema } from "./schemes";
import { VStack } from "@/components/ui/vstack";
import { Database } from "@/database.types";
import { Divider } from "@/components/ui/divider";

interface AddRecordFormProps {
  control: Control<FieldValues>;
  getValues: UseFormGetValues<AddRecordSchema>;
  formState: FormState<AddRecordSchema>;
  watch: UseFormWatch<AddRecordSchema>;
  category: Database["public"]["Tables"]["expense_category"]["Row"][];
  loading: boolean;
  resetField: UseFormResetField<AddRecordSchema>;
}

const AddRecordForm = ({
  control,
  formState,
  category,
  loading,
  watch,
  resetField,
}: AddRecordFormProps) => {
  const { errors } = formState;
  const isExpense = watch("is_expense") as unknown as string;

  const filteredCategory = React.useMemo(() => {
    const filteredTransactionType = category.filter((item) => {
      return item.is_expense === (isExpense === "true");
    });

    return filteredTransactionType.map((item) => ({
      label: item.name ?? "",
      value: item.id.toString(),
    }));
  }, [category, isExpense]);

  return (
    <VStack space="lg" className="py-4">
      <InputWithController
        control={control}
        errors={errors.name?.message}
        required={true}
        placeholder="Name"
        name="name"
      />
      <InputWithController
        control={control}
        errors={errors.amount?.message}
        required={true}
        placeholder="Amount"
        name="amount"
        keyboardType="numeric"
        inputMode="decimal"
      />

      <DatePickerWithController
        control={control}
        errors={errors.spend_date?.message}
        required={true}
        name="spend_date"
        inputProps={{ placeholder: "Date" }}
      />
      <RadioWithController
        control={control}
        errors={errors.is_expense?.message}
        required={true}
        name="is_expense"
        value="Expense"
        options={[
          { label: "Expense", value: "true" },
          { label: "Income", value: "false" },
        ]}
        onChange={() => {
          resetField("category");
        }}
      />
      {isExpense && (
        <>
          <Divider />
          <SelectWithController
            control={control}
            errors={errors.category?.message}
            required={true}
            name="category"
            placeholder="Category"
            options={filteredCategory}
            loading={loading}
          />
        </>
      )}
    </VStack>
  );
};

export default AddRecordForm;
