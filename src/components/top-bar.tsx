import * as React from "react";
import { Appbar } from "react-native-paper";

interface IconProps {
  icon: string;
  onPress: () => void;
}

export interface HeaderProps {
  title: string;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
}

const TopBar = ({ title, leftIcon, rightIcon }: HeaderProps) => (
  <Appbar.Header>
    {leftIcon && (
      <Appbar.Action icon={leftIcon.icon} onPress={leftIcon.onPress} />
    )}
    <Appbar.Content title={title} />
    {rightIcon && (
      <Appbar.Action icon={rightIcon.icon} onPress={rightIcon.onPress} />
    )}
  </Appbar.Header>
);

export default TopBar;
