import React from "react";
import FormWithController, {
  FormWithControllerProps,
} from "./form-with-controller";
import { Radio, RadioGroup, RadioLabel } from "./ui/radio";
import { HStack } from "./ui/hstack";
import { CheckedIcon, CircleIcon } from "@/assets/Icons";
import { Icon } from "./ui/icon";
import { Skeleton } from "./ui/skeleton";

interface RadioWithControllerProps
  extends FormWithControllerProps,
    React.ComponentProps<typeof RadioGroup> {
  options: { label: string; value: string }[];
  loading?: boolean;
}

const RadioWithController = ({
  control,
  errors,
  required = false,
  name,
  label,
  size = "sm",
  options,
  loading = false,
  onChange,
  ...rest
}: RadioWithControllerProps) => {
  const handleChange = (
    onChangeHandler: (value: string) => void,
    value: string
  ) => {
    onChange && onChange(value);
    onChangeHandler(value);
  };

  return (
    <FormWithController
      control={control}
      errors={errors}
      required={required}
      name={name}
      label={label}
      size={size}
    >
      {({ value, onChange }) =>
        loading ? (
          <Skeleton className="h-5" variant="rounded" />
        ) : (
          <RadioGroup
            onChange={(value) => handleChange(onChange, value)}
            value={value}
            {...rest}
          >
            <HStack space="sm">
              {options.map((option) => (
                <Radio value={option.value} size={size} key={option.value}>
                  {value === option.value ? (
                    <Icon as={CheckedIcon} />
                  ) : (
                    <Icon as={CircleIcon} />
                  )}
                  <RadioLabel>{option.label}</RadioLabel>
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
        )
      }
    </FormWithController>
  );
};

export default RadioWithController;
