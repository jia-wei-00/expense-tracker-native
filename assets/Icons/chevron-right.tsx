import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function ChevronRight(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M8 5v2h2V5H8zm4 4V7h-2v2h2zm2 2V9h-2v2h2zm0 2h2v-2h-2v2zm-2 2v-2h2v2h-2zm0 0h-2v2h2v-2zm-4 4v-2h2v2H8z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default ChevronRight;
