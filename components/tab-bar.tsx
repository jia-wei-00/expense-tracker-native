import { View } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text } from "@/components";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  //   const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === "(settings)") {
              return navigation.reset({
                index: 0,
                routes: [{ name: route.name }],
              });
            }

            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="dark:bg-black flex flex-col items-center justify-center grow p-1 gap-1 border-t border-background-50 py-2"
            key={route.name}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                color: isFocused ? colors.white : colors.gray[500],
                focused: isFocused,
                size: 12,
              })}
            <Text.Normal
              className={twMerge(
                "font-normal text-xs",
                isFocused ? "dark:text-white" : "dark:text-gray-500"
              )}
            >
              {label as React.ReactNode}
            </Text.Normal>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default TabBar;
