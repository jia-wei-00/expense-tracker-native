import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function ChevronDownIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7V8z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default ChevronDownIcon;
