import React from "react";
import { HStack } from "./ui/hstack";
import { Pressable } from "./ui/pressable";
import Text from "./Text";
import { twMerge } from "tailwind-merge";
import { Box } from "./ui/box";
import usePagination, { PaginationItem } from "@/hooks/usePagination";
import { Center } from "./ui/center";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/Icons";
import { Icon } from "./ui/icon";

export interface PaginationProps {
  items: PaginationItem[];
}

type RenderPageButtonProps = {
  pageNumber: number;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
};

const RenderNavigationButton = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) => (
  <Pressable
    onPress={onClick}
    disabled={disabled}
    className={twMerge(
      "h-8 w-8 flex items-center justify-center rounded-md",
      disabled ? "bg-background-100" : "border border-background-300"
    )}
  >
    {children}
  </Pressable>
);

const RenderPageButton = ({
  pageNumber,
  onClick,
  disabled,
  selected,
}: RenderPageButtonProps) => (
  <Pressable
    key={pageNumber}
    onPress={onClick}
    disabled={disabled}
    className={twMerge(
      "h-8 w-8 flex items-center justify-center rounded-md",
      selected ? "bg-primary-500" : ""
    )}
  >
    <Center>
      <Text.Normal className={selected ? "text-typography-same" : ""}>
        {pageNumber}
      </Text.Normal>
    </Center>
  </Pressable>
);

const RenderEllipsis = () => (
  <Box className="h-8 w-8 flex items-center justify-center rounded-md">
    <Center>
      <Text.Normal key="ellipsis" className="px-2">
        ...
      </Text.Normal>
    </Center>
  </Box>
);

const Pagination = ({ items }: PaginationProps) => {
  return (
    <HStack
      space="sm"
      reversed={false}
      className="sticky px-2 pb-4 pt-2 bg-background-0"
    >
      {items.map(
        ({ page, type, selected, onClick, disabled, ...item }, index) => {
          switch (type) {
            case "start-ellipsis":
            case "end-ellipsis":
              return <RenderEllipsis />;
            case "page":
              return (
                <RenderPageButton
                  pageNumber={page ?? 0}
                  selected={selected}
                  onClick={onClick}
                  disabled={disabled}
                />
              );
            case "next":
              return (
                <RenderNavigationButton onClick={onClick} disabled={disabled}>
                  <Icon as={ChevronRightIcon} />
                </RenderNavigationButton>
              );
            case "previous":
              return (
                <RenderNavigationButton onClick={onClick} disabled={disabled}>
                  <Icon as={ChevronLeftIcon} />
                </RenderNavigationButton>
              );
          }
          return null;
        }
      )}
    </HStack>
  );
};

export default Pagination;
