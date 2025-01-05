import React from "react";
import { Text } from "@/components/ui/text";
import { twMerge } from "tailwind-merge";
import { NormalProps } from "./normal";
import { color } from "./common-style";

const Title = ({ className, reverse = false, ...rest }: NormalProps) => {
  return (
    <Text
      className={twMerge("text-lg font-bold", color(reverse), className)}
      {...rest}
    />
  );
};

Title.displayName = "Text.Title";

export default Title;
