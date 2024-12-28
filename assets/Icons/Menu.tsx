import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function MenuIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default MenuIcon;
