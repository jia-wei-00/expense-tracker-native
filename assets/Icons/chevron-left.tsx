import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function ChevronLeft(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M16 5v2h-2V5h2zm-4 4V7h2v2h-2zm-2 2V9h2v2h-2zm0 2H8v-2h2v2zm2 2v-2h-2v2h2zm0 0h2v2h-2v-2zm4 4v-2h-2v2h2z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default ChevronLeft;
