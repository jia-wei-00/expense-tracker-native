import React from "react";
import { Input, InputField } from "./ui/input";
import FormWithController, {
  FormWithControllerProps,
} from "./form-with-controller";

type InputWithControllerProps = FormWithControllerProps &
  React.ComponentProps<typeof InputField> & {
    placeholder: string;
    isReadOnly?: boolean;
  };

const InputWithController = ({
  control,
  errors,
  required = false,
  placeholder,
  name,
  label,
  size = "sm",
  isReadOnly = false,
  ...rest
}: InputWithControllerProps) => {
  return (
    <FormWithController
      control={control}
      errors={errors}
      required={required}
      name={name}
      label={label}
      size={size}
    >
      {({ value, onChange, onBlur }) => (
        <Input className="text-center" size="sm" isReadOnly={isReadOnly}>
          <InputField
            type="text"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            {...rest}
          />
        </Input>
      )}
    </FormWithController>
  );
};

export default InputWithController;
