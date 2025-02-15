import React from "react";
import { Text } from "@/components/ui/text";
import { twMerge } from "tailwind-merge";
import { color } from "./common-style";

export interface NormalProps extends React.ComponentProps<typeof Text> {
  reverse?: boolean;
}

const Normal = ({
  className,
  reverse = false,
  size = "md",
  ...rest
}: NormalProps) => {
  return (
    <Text
      className={twMerge("font-semibold", color(reverse), className)}
      size={size}
      {...rest}
    />
  );
};

Normal.displayName = "Text.Normal";

export default Normal;
