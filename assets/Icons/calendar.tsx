import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Calendar(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        d="M15 2h2v2h4v18H3V4h4V2h2v2h6V2zM9 6H5v2h14V6H9zm-4 4v10h14V10H5zm2 2h2v2H7v-2zm6 0h-2v2h2v-2zm2 0h2v2h-2v-2zm-6 4H7v2h2v-2zm2 0h2v2h-2v-2zm6 0h-2v2h2v-2z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default Calendar;
