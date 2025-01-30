import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function PlusIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7V4z" fill="currentColor" />
    </Svg>
  );
}

export default PlusIcon;
