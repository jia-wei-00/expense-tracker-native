import React from "react";
import { Text } from "@/components/ui/text";
import { twMerge } from "tailwind-merge";
import { color } from "./common-style";
import { NormalProps } from "./normal";

const Bold = ({ className, reverse = false, ...rest }: NormalProps) => {
  return (
    <Text
      className={twMerge("text-md font-bold", color(reverse), className)}
      {...rest}
    />
  );
};

Bold.displayName = "Text.Bold";

export default Bold;
