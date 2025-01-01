import React from "react";
import { Text } from "@/components/ui/text";
import { twMerge } from "tailwind-merge";
import { color } from "./common-style";

export interface NormalProps extends React.ComponentProps<typeof Text> {
  reverse?: boolean;
}

const Normal = ({ className, reverse = false, ...rest }: NormalProps) => {
  return (
    <Text
      className={twMerge("text-md font-semibold", color(reverse), className)}
      {...rest}
    />
  );
};

Normal.displayName = "Text.Normal";

export default Normal;
