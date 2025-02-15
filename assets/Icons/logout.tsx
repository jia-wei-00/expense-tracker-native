import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function LogOutIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M5 3h16v4h-2V5H5v14h14v-2h2v4H3V3h2zm16 8h-2V9h-2V7h-2v2h2v2H7v2h10v2h-2v2h2v-2h2v-2h2v-2z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default LogOutIcon;
