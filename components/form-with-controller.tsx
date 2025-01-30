import React from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
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

type BaseFormWithControllerProps = Pick<
  ControllerProps<FieldValues, string>,
  "name" | "control"
> & {
  errors?: string;
  required?: boolean;
  label?: string;
  size?: React.ComponentProps<typeof FormControl>["size"];
  isReadOnly?: boolean;
  children: (props: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  }) => React.ReactNode;
};

const SelectWithController = ({
  control,
  errors,
  required = false,
  name,
  label,
  size = "sm",
  children,
  isReadOnly = false,
}: BaseFormWithControllerProps) => {
  return (
    <Controller
      control={control}
      rules={{ required }}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl
          isRequired={required}
          isInvalid={!!errors}
          size={size}
          isReadOnly={isReadOnly}
        >
          {label && (
            <FormControlLabel>
              <FormControlLabelText className="dark:text-zinc-400">
                {label}
              </FormControlLabelText>
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
