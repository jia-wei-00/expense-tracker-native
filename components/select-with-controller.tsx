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
  SelectTrigger,
} from "./ui/select";
import FormWithController, {
  FormWithControllerProps,
} from "./form-with-controller";
import { Text } from "@/components";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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
  ...rest
}: SelectWithControllerProps) => {
  const rotate = useSharedValue<number>(0);

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
    >
      {({ value, onChange }) => (
        <Select
          onValueChange={onChange}
          selectedValue={
            options.find((option) => option.value === value)?.label
          }
          onOpen={() => {
            rotate.value = 180;
          }}
          onClose={() => {
            rotate.value = 0;
          }}
          {...rest}
        >
          <SelectTrigger size={size}>
            <SelectInput placeholder={placeholder} className="flex-1" />
            <Animated.View style={[animatedStyle]} className="w-4 mr-3">
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </Animated.View>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop className="bg-black/50" />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <ScrollView className="w-full max-h-5/6">
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
              </ScrollView>
            </SelectContent>
          </SelectPortal>
        </Select>
      )}
    </FormWithController>
  );
};

export default SelectWithController;
