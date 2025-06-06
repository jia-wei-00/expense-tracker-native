import { useState } from "react";

export interface PaginationItem {
  onClick: () => void;
  type: string;
  page: number | null;
  selected: boolean;
  disabled: boolean;
  "aria-current"?: string | undefined;
}

export interface PaginationProps {
  boundaryCount?: number;
  componentName?: string;
  count?: number;
  defaultPage?: number;
  disabled?: boolean;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: (value: number) => void;
  page?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
}

const usePagination = (props: PaginationProps) => {
  const [page, setPageState] = useState(1);

  const {
    boundaryCount = 1,
    count = 1,
    defaultPage = 1,
    onChange: handleChange,
    page: pageProp,
    disabled = false,
    hideNextButton = false,
    hidePrevButton = false,
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
  } = props;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    count - boundaryCount - 1
  );

  // Basic list of items to render
  // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(showFirstButton ? ["first"] : []),
    ...(hidePrevButton ? [] : ["previous"]),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? ["end-ellipsis"]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ["next"]),
    ...(showLastButton ? ["last"] : []),
  ];

  const handleClick = (value: number) => {
    if (!pageProp) {
      setPageState(value);
    }
    if (handleChange) {
      handleChange(value);
    }
  };

  // Map the button type to its page number
  const buttonPage = (type: string) => {
    switch (type) {
      case "first":
        return 1;
      case "previous":
        return page - 1;
      case "next":
        return page + 1;
      case "last":
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map((item) => {
    return typeof item === "number"
      ? {
          onClick: () => {
            handleClick(item);
          },
          type: "page",
          page: item,
          selected: item === page,
          disabled,
          "aria-current": item === page ? "page" : undefined,
        }
      : {
          onClick: () => {
            handleClick(buttonPage(item) ?? 0);
          },
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (!item.includes("ellipsis") &&
              (item === "next" || item === "last" ? page >= count : page <= 1)),
        };
  });

  return {
    items,
    page,
  };
};

export default usePagination;
