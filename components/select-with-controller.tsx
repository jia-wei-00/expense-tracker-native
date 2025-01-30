import React from "react";
import { ChevronDownIcon } from "@/assets/Icons";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectScrollView,
  SelectTrigger,
} from "./ui/select";
import FormWithController, {
  FormWithControllerProps,
} from "./form-with-controller";
import { Text } from "@/components/Text/index";
import { Box } from "@/components/ui/box";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";
interface SelectWithControllerProps
  extends FormWithControllerProps,
    React.ComponentProps<typeof Select> {
  options: { label: string; value: string }[];
  loading?: boolean;
}

const SelectWithController = ({
  control,
  errors,
  required = false,
  placeholder,
  name,
  label,
  size = "sm",
  options,
  loading = false,
  isReadOnly = false,
  children,
  onOpen,
  onClose,
  ...rest
}: SelectWithControllerProps) => {
  const rotate = useSharedValue<number>(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: withSpring(`${rotate.value}deg`, { duration: 1000 }) },
      ],
      transformOrigin: "center",
    };
  });

  return (
    <FormWithController
      control={control}
      errors={errors}
      required={required}
      name={name}
      label={label}
      size={size}
      isReadOnly={isReadOnly}
    >
      {({ value, onChange }) => (
        <Select
          onValueChange={onChange}
          selectedValue={
            options.find((option) => option.value === value)?.label
          }
          onOpen={() => {
            setIsOpen(true);
            rotate.value = 180;
            onOpen?.();
          }}
          onClose={() => {
            setIsOpen(false);
            rotate.value = 0;
            onClose?.();
          }}
          {...rest}
        >
          <SelectTrigger size={size}>
            <SelectInput
              placeholder={placeholder}
              value={options.find((option) => option.value === value)?.label}
              className="flex-1 py-0"
            />
            <SelectIcon
              className={twMerge("mr-3", isOpen ? "rotate-180" : "rotate-0")}
              as={ChevronDownIcon}
            />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop className="bg-black/50" />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectScrollView className="w-full max-h-5/6">
                {loading ? (
                  <Box className="p-4">
                    <Text.Normal>Loading...</Text.Normal>
                  </Box>
                ) : options.length ? (
                  options.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      className="rounded-xl"
                    />
                  ))
                ) : (
                  <Box className="p-4">
                    <Text.Normal>No options</Text.Normal>
                  </Box>
                )}
                {children}
              </SelectScrollView>
            </SelectContent>
          </SelectPortal>
        </Select>
      )}
    </FormWithController>
  );
};

export default SelectWithController;
