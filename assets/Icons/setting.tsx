import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SettingIcon(props: SvgProps) {
  return (
    <Svg fill="none" viewBox="0 0 100 100" {...props}>
      <Path
        d="M50 10 L60 20 L50 30 L40 20 Z M50 30 L60 40 L50 50 L40 40 Z M50 50 L60 60 L50 70 L40 60 Z M50 70 L60 80 L50 90 L40 80 Z"
        fill="currentColor"
      />
    </Svg>
  );
}

export default SettingIcon;
