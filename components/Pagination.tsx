import React from "react";
import { HStack } from "./ui/hstack";
import { Pressable } from "./ui/pressable";
import Text from "./Text";
import { twMerge } from "tailwind-merge";
import { Box } from "./ui/box";
import usePagination from "@/hooks/usePagination";

export interface PaginationProps {
  totalCount: number;
}

const renderNavigationButton = (
  onClick: () => void,
  disabled: boolean,
  children: React.ReactNode
) => (
  <Pressable
    onPress={onClick}
    disabled={disabled}
    className={twMerge(
      "h-8 w-8 flex items-center justify-center rounded-md border",
      disabled ? "bg-background-100" : "border-background-200"
    )}
  >
    {children}
  </Pressable>
);

const renderPageButton = (
  pageNumber: number,
  //   onPageChange: (page: number) => void,
  selected: boolean
) => (
  <Pressable
    key={pageNumber}
    // onPress={() => onPageChange(pageNumber)}
    className={twMerge(
      "h-8 w-8 flex items-center justify-center rounded-md",
      selected ? "bg-primary-500" : ""
    )}
  >
    <Text.Normal className={selected ? "text-typography-same" : ""}>
      {pageNumber}
    </Text.Normal>
  </Pressable>
);

const renderEllipsis = () => (
  <Box className="h-8 w-8 flex items-center justify-center rounded-md">
    <Text.Normal key="ellipsis" className="px-2">
      ...
    </Text.Normal>
  </Box>
);

const Pagination = ({ totalCount }: PaginationProps) => {
  const { items } = usePagination({
    count: totalCount,
  });

  const pages = [];

  console.log("items", items);

  return (
    <HStack
      space="sm"
      reversed={false}
      className="sticky px-2 pb-4 pt-2 bg-background-0"
    >
      {items.map(({ page, type, selected, ...item }, index) => {
        let children = null;
        if (type === "start-ellipsis" || type === "end-ellipsis") {
          children = renderEllipsis();
        } else if (type === "page") {
          children = renderPageButton(page ?? 0, selected);
        }
        return children;
      })}
    </HStack>
  );
};

export default Pagination;
