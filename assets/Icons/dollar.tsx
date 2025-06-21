import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Dollar(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M11 2h2v4h6v2H7v3H5V6h6V2zM5 18h6v4h2v-4h6v-2H5v2zm14-7H5v2h12v3h2v-5z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default Dollar;
