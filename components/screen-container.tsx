import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
import { twMerge } from "tailwind-merge";

interface ScreenContainerProps extends React.ComponentProps<typeof ScrollView> {
  children: React.ReactNode;
  vStackClassName?: string;
}

const ScreenContainer = ({
  children,
  vStackClassName,
  className,
  ...rest
}: ScreenContainerProps) => {
  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      className={twMerge("h-full bg-black p-2", className)}
      {...rest}
    >
      <VStack space="md" className={twMerge(vStackClassName)}>
        {children}
      </VStack>
    </ScrollView>
  );
};

export default ScreenContainer;
