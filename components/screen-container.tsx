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
      className={twMerge("bg-background-0 flex-1", className)}
      stickyHeaderIndices={[0]}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {/* Sticky Header */}
      <VStack
        space="md"
        className={twMerge(
          stickyContentClassName,
          "bg-background-0 p-4 shadow-sm"
        )}
      >
        {stickyContent}
      </VStack>

      {/* Main Content */}
      <VStack
        space="md"
        className={twMerge(vStackClassName, "bg-background-0 px-4 pb-4")}
      >
        {children}
      </VStack>
    </ScrollView>
  );
};

export default ScreenContainer;
