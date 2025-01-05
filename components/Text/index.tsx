import { ReactNode } from "react";
import Normal from "./normal";
import Subtitle from "./subtitle";
import Title from "./title";
import Bold from "./bold";

export type TextVariants = {
  Normal: typeof Normal;
  Subtitle: typeof Subtitle;
  Title: typeof Title;
  Bold: typeof Bold;
};

export const Text: TextVariants = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

Text.Normal = Normal;
Text.Subtitle = Subtitle;
Text.Title = Title;
Text.Bold = Bold;

export default Text;
