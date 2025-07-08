import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, useWindowDimensions } from "react-native";
import { twMerge } from "tailwind-merge";
import {
  OnTabChangeCallback,
  TabBarProps,
  Tabs,
} from "react-native-collapsible-tab-view";
import { TabView, SceneMap, SceneRendererProps } from "react-native-tab-view";
// import { ScrollView } from "react-native-gesture-handler";

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
  initialIndex?: number;
  tabScreens?: TabScreen[];
  // tabBar?: (props: TabBarProps<string>) => React.ReactElement;
  tabBar?: (props: SceneRendererProps) => React.ReactNode;
  onTabChange?: OnTabChangeCallback<string>;
}

const ScreenContainer = ({
  children,
  vStackClassName,
  className,
  stickyContent,
  stickyContentClassName,
  initialIndex = 0,
  tabScreens,
  refreshControl,
  tabBar,
  onTabChange,
  ...rest
}: ScreenContainerProps) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(initialIndex);

  const routes = tabScreens?.map((item) => ({
    key: item.key,
    title: item.title,
  }));

  const renderScene =
    tabScreens &&
    SceneMap(
      Object.fromEntries(
        tabScreens.map((item) => [
          item.key,
          () => (
            <ScrollView>
              <VStack
                space="md"
                className={twMerge(vStackClassName, "bg-background-0 pb-4")}
              >
                {item.render}
              </VStack>
            </ScrollView>
          ),
        ])
      )
    );

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
      {tabScreens ? (
        <VStack
          className={twMerge("bg-background-0 flex-1", className)}
          {...rest}
        >
          {stickyContent && renderHeader()}
          {/* <Tabs.Container
            renderHeader={renderHeader}
            revealHeaderOnScroll
            headerContainerStyle={{
              backgroundColor: "transparent",
            }}
            renderTabBar={tabBar}
            onTabChange={onTabChange}
            ref={ref}
          >
            {tabScreens.map((item) => (
              <Tabs.Tab name={item.key}>
                <Tabs.ScrollView refreshControl={refreshControl}>
                  {item.render}
                </Tabs.ScrollView>
              </Tabs.Tab>
            ))}
          </Tabs.Container> */}
          {routes && renderScene && tabBar && (
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={tabBar}
            />
          )}
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
