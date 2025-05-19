import React from "react";
import { HStack } from "./ui/hstack";
import { Pressable } from "./ui/pressable";
import Text from "./Text";
import { twMerge } from "tailwind-merge";
import { Box } from "./ui/box";

export interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
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
  onPageChange: (page: number) => void,
  currentPage: number
) => (
  <Pressable
    key={pageNumber}
    onPress={() => onPageChange(pageNumber)}
    className={twMerge(
      "h-8 w-8 flex items-center justify-center rounded-md",
      currentPage === pageNumber ? "bg-primary-500" : ""
    )}
  >
    <Text.Normal
      className={currentPage === pageNumber ? "text-typography-same" : ""}
    >
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

const Pagination = ({
  totalCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(renderPageButton(1, onPageChange, currentPage));

    if (currentPage <= 4) {
      // Show 2, 3, 4, 5 if current page is 1-4
      for (let i = 2; i <= 5; i++) {
        if (i <= totalCount) {
          pages.push(renderPageButton(i, onPageChange, currentPage));
        }
      }
      if (totalCount > 6) {
        pages.push(renderEllipsis());
      }
    } else if (currentPage >= totalCount - 3) {
      // Show last 5 pages if current page is near the end
      if (totalCount > 6) {
        pages.push(renderEllipsis());
      }
      for (let i = totalCount - 4; i <= totalCount; i++) {
        if (i > 1) {
          pages.push(renderPageButton(i, onPageChange, currentPage));
        }
      }
    } else {
      // Show current page and one before/after for middle pages
      pages.push(renderEllipsis());
      pages.push(renderPageButton(currentPage - 1, onPageChange, currentPage));
      pages.push(renderPageButton(currentPage, onPageChange, currentPage));
      pages.push(renderPageButton(currentPage + 1, onPageChange, currentPage));
      pages.push(renderEllipsis());
    }

    // Only show last page if we're not already showing it
    if (totalCount > 1 && currentPage < totalCount - 3) {
      pages.push(renderPageButton(totalCount, onPageChange, currentPage));
    }

    return pages;
  };

  return (
    <HStack
      space="sm"
      reversed={false}
      className="sticky px-2 pb-4 pt-2 bg-background-0"
    >
      {/* Previous page button */}
      {renderNavigationButton(
        () => onPageChange(currentPage - 1),
        currentPage === 1,
        <Text.Normal>‹</Text.Normal>
      )}

      {/* Page numbers */}
      {renderPageNumbers()}

      {/* Next page button */}
      {renderNavigationButton(
        () => onPageChange(currentPage + 1),
        currentPage === totalCount,
        <Text.Normal>›</Text.Normal>
      )}
    </HStack>
  );
};

export default Pagination;
