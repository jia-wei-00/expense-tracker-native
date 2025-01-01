import * as React from "react";
// import { Appbar, Text, Divider, Menu } from "react-native-paper";
import { useSignOutMutation } from "../store/features";
interface IconProps {
  icon: string;
  onPress: () => void;
}
export interface HeaderProps {
  title: string;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
}
const TopBar = ({ title, leftIcon, rightIcon }: HeaderProps) => {
  const [visible, setVisible] = React.useState(false);
  const [signOut, { isLoading }] = useSignOutMutation();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    // <Appbar.Header>
    //   {leftIcon && (
    //     <Appbar.Action icon={leftIcon.icon} onPress={leftIcon.onPress} />
    //   )}
    //   <Appbar.Content title={title} />
    //   {rightIcon && (
    //     <>
    //       <Menu
    //         visible={visible}
    //         onDismiss={closeMenu}
    //         anchorPosition="bottom"
    //         anchor={<Appbar.Action icon={rightIcon.icon} onPress={openMenu} />}
    //       >
    //         <Menu.Item onPress={() => {}} title="Item 1" />
    //         <Menu.Item onPress={() => {}} title="Item 2" />
    //         <Divider />
    //         <Menu.Item
    //           onPress={() => signOut("")}
    //           title={isLoading ? "Logging out..." : "Logout"}
    //         />
    //       </Menu>
    //     </>
    //   )}
    // </Appbar.Header>
  );
};

export default TopBar;
