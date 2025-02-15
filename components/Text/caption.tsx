import React from "react";
import { Text } from "@/components/ui/text";
import { twMerge } from "tailwind-merge";
import { colorCaption } from "./common-style";

export interface NormalProps extends React.ComponentProps<typeof Text> {
  reverse?: boolean;
}

const Caption = ({
  className,
  reverse = false,
  size = "sm",
  ...rest
}: NormalProps) => {
  return (
    <Text
      className={twMerge(colorCaption(reverse), className)}
      size={size}
      {...rest}
    />
  );
};

Caption.displayName = "Text.Caption";

export default Caption;
