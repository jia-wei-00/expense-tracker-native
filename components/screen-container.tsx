import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
import { twMerge } from "tailwind-merge";

interface ScreenContainerProps extends React.ComponentProps<typeof ScrollView> {
  children: React.ReactNode;
  vStackClassName?: string;
  stickyContentClassName?: string;
  stickyContent?: React.ReactNode;
}

const ScreenContainer = ({
  children,
  vStackClassName,
  className,
  stickyContent,
  stickyContentClassName,
  ...rest
}: ScreenContainerProps) => {
  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      className={twMerge("bg-background-0", className)}
      {...rest}
    >
      <VStack
        space="md"
        className={twMerge(stickyContentClassName, "bg-background-0 p-2")}
      >
        {stickyContent}
      </VStack>
      <VStack
        space="md"
        className={twMerge(vStackClassName, "bg-background-0 px-2 ")}
      >
        {children}
      </VStack>
    </ScrollView>
  );
};

export default ScreenContainer;
