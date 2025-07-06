import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
import { twMerge } from "tailwind-merge";
import { OnTabChangeCallback, Tabs } from "react-native-collapsible-tab-view";

type TabScreen = {
  key: string;
  render: React.ReactNode;
  title: string;
};

interface ScreenContainerProps extends React.ComponentProps<typeof ScrollView> {
  children?: React.ReactNode;
  vStackClassName?: string;
  stickyContentClassName?: string;
  stickyContent?: React.ReactNode;
  index?: number;
  tabScreens?: TabScreen[];
  tabBar?: React.ReactElement | undefined;
  onTabChange?: OnTabChangeCallback<string>;
}

const ScreenContainer = ({
  children,
  vStackClassName,
  className,
  stickyContent,
  stickyContentClassName,
  index = 0,
  tabScreens,
  refreshControl,
  tabBar,
  onTabChange,
  ...rest
}: ScreenContainerProps) => {
  const renderHeader = () => {
    return (
      <VStack
        space="md"
        className={twMerge(
          stickyContentClassName,
          "bg-background-0 py-4 shadow-sm"
        )}
      >
        {stickyContent}
      </VStack>
    );
  };

  return (
    <>
      {tabScreens && tabScreens.length > 0 ? (
        <VStack
          className={twMerge("bg-background-0 flex-1", className)}
          {...rest}
        >
          <Tabs.Container
            renderHeader={renderHeader}
            revealHeaderOnScroll
            headerContainerStyle={{
              backgroundColor: "transparent",
            }}
            renderTabBar={() => tabBar || null}
            onTabChange={onTabChange}
          >
            {tabScreens.map((item) => (
              <Tabs.Tab name={item.key}>
                <Tabs.ScrollView refreshControl={refreshControl}>
                  {item.render}
                </Tabs.ScrollView>
              </Tabs.Tab>
            ))}
          </Tabs.Container>
        </VStack>
      ) : (
        <ScrollView
          className={twMerge("bg-background-0 flex-1", className)}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          {...rest}
        >
          {stickyContent && renderHeader()}
          <VStack
            space="md"
            className={twMerge(vStackClassName, "bg-background-0 pb-4")}
          >
            {children}
          </VStack>
        </ScrollView>
      )}
    </>
  );
};

export default ScreenContainer;
