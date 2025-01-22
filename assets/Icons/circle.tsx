import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function CircleIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M17 3H7v2H5v2H3v10h2v2h2v2h10v-2h2v-2h2V7h-2V5h-2V3zm0 2v2h2v10h-2v2H7v-2H5V7h2V5h10z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default CircleIcon;
