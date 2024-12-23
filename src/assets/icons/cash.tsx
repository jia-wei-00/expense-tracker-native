import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function CashIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M16 4H2v12h4v4h16V8h-4V4h-2zm0 2v2H6v6H4V6h12zm-8 4h12v8H8v-8zm8 2h-4v4h4v-4z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default CashIcon;
