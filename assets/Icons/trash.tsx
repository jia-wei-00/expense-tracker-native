import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function TrashIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M16 2v4h6v2h-2v14H4V8H2V6h6V2h8zm-2 2h-4v2h4V4zm0 4H6v12h12V8h-4zm-5 2h2v8H9v-8zm6 0h-2v8h2v-8z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default TrashIcon;
