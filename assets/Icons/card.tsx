import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function CardIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M4 4h16v2H4v2h16v4H4v6h16v2H2V4h2zm18 0h-2v16h2V4z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default CardIcon;
