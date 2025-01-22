import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { AlertIcon } from "@/assets/Icons";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";

export type FormWithControllerProps = Omit<
  BaseFormWithControllerProps,
  "children"
>;

interface BaseFormWithControllerProps {
  control: Control<FieldValues>;
  errors?: string;
  required?: boolean;
  name: string;
  label?: string;
  size?: React.ComponentProps<typeof FormControl>["size"];
  children: (props: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  }) => React.ReactNode;
}

const SelectWithController = ({
  control,
  errors,
  required = false,
  name,
  label,
  size = "sm",
  children,
}: BaseFormWithControllerProps) => {
  return (
    <Controller
      control={control}
      rules={{ required }}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl isRequired={required} isInvalid={!!errors} size={size}>
          {label && (
            <FormControlLabel>
              <FormControlLabelText>{label}</FormControlLabelText>
            </FormControlLabel>
          )}
          {children({ onChange, onBlur, value })}
          <FormControlError>
            <FormControlErrorIcon as={AlertIcon} />
            <FormControlErrorText>{errors}</FormControlErrorText>
          </FormControlError>
        </FormControl>
      )}
      name={name}
    />
  );
};

export default SelectWithController;
