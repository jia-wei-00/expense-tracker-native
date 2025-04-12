import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { AlertIcon, CalendarIcon } from "@/assets/Icons";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

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
  inputProps?: React.ComponentProps<typeof InputField>;
  datePickerProps?: React.ComponentProps<typeof RNDateTimePicker>;
  isReadOnly?: boolean;
}

const SelectWithController = ({
  control,
  errors,
  required = false,
  name,
  label,
  size = "sm",
  datePickerProps,
  inputProps,
  isReadOnly = false,
}: BaseFormWithControllerProps) => {
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

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
              <FormControlLabelText className="text-secondary-0">
                {label}
              </FormControlLabelText>
            </FormControlLabel>
          )}

          <Input className="text-center" size="sm" isReadOnly>
            <InputField
              type="text"
              onBlur={onBlur}
              value={dayjs(value).format("DD/MM/YYYY")}
              editable={false}
              {...inputProps}
            />
            <InputSlot
              className="pr-3"
              onPress={() => {
                setOpenDatePicker(true);
              }}
            >
              <InputIcon as={CalendarIcon} />
            </InputSlot>
          </Input>

          {openDatePicker && (
            <RNDateTimePicker
              onChange={(event: DateTimePickerEvent) => {
                const {
                  type,
                  nativeEvent: { timestamp },
                } = event;

                if (type === "set" || type === "dismissed") {
                  setOpenDatePicker(false);
                }

                onChange(timestamp);
              }}
              value={new Date(value)}
              {...datePickerProps}
            />
          )}
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
