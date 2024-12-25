import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function HistoryIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M15 2h2v2h4v8h-2v-2H5v10h6v2H3V4h4V2h2v2h6V2zM9 6H5v2h14V6H9zm8 6v2h-4v-2h4zm-4 6h-2v-4h2v4zm4 0h-4v2h6v2h2v-2h-2v-6h-2v4z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default HistoryIcon;
