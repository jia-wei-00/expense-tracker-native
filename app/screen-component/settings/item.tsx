import { ChevronRightIcon } from "@/assets/Icons";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components";
import React from "react";
import { SvgProps } from "react-native-svg";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";

interface ItemProps {
  children?: React.ReactNode;
  items?: {
    label: string;
    icon?: (props: SvgProps) => React.JSX.Element;
    onPress?: () => void;
    iconLabel?: string;
  }[];
}

interface ItemWrapperProps {
  children: React.ReactNode;
  hasChevron?: boolean;
  onPress?: () => void;
  iconLabel?: string;
}

const ItemWrapper = ({
  children,
  hasChevron = false,
  iconLabel,
  onPress,
}: ItemWrapperProps) => {
  return (
    <Pressable onPress={onPress}>
      <HStack space="md" className="justify-between items-center py-2">
        <HStack space="md">{children}</HStack>
        <HStack space="xs">
          {iconLabel && <Text.Caption>{iconLabel}</Text.Caption>}
          {hasChevron && <Icon as={ChevronRightIcon} size="md" />}
        </HStack>
      </HStack>
    </Pressable>
  );
};

const Item = ({ children, items }: ItemProps) => {
  return (
    <VStack
      space="md"
      className="dark:bg-background-0 border rounded-md px-4 py-2"
    >
      {children && <ItemWrapper>{children}</ItemWrapper>}
      {items?.map((item, key) => (
        <ItemWrapper
          hasChevron
          onPress={item.onPress}
          key={key}
          iconLabel={item.iconLabel}
        >
          {item.icon && <Icon as={item.icon} />}
          <Text.Normal size="sm">{item.label}</Text.Normal>
        </ItemWrapper>
      ))}
    </VStack>
  );
};

export default Item;
