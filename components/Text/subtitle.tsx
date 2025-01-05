import React from "react";
import { Text } from "@/components/ui/text";
import { twMerge } from "tailwind-merge";
import { NormalProps } from "./normal";
import { color } from "./common-style";

const Subtitle = ({ className, reverse = false, ...rest }: NormalProps) => {
  return (
    <Text
      className={twMerge("text-lg font-semibold", color(reverse), className)}
      {...rest}
    />
  );
};

Subtitle.displayName = "Text.Subtitle";

export default Subtitle;
