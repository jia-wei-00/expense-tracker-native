import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, useWindowDimensions } from "react-native";
import { twMerge } from "tailwind-merge";
import { View, StyleSheet, ListRenderItem } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { TabView, SceneMap } from "react-native-tab-view";

const HEADER_HEIGHT = 250;

const DATA = [0, 1, 2, 3, 4];
const identity = (v: unknown): string => v + "";

const Header = () => {
  return <View style={styles.header} />;
};

type SceneMapping = {
  key: string;
  render: React.ReactNode;
  title: string;
};

interface ScreenContainerProps extends React.ComponentProps<typeof ScrollView> {
  children: React.ReactNode;
  vStackClassName?: string;
  stickyContentClassName?: string;
  stickyContent?: React.ReactNode;
  index?: number;
  sceneMapping: SceneMapping[];
  setIndex: (index: number) => void;
}

const ScreenContainer = ({
  children,
  vStackClassName,
  className,
  stickyContent,
  stickyContentClassName,
  index = 0,
  sceneMapping,
  setIndex,
  ...rest
}: ScreenContainerProps) => {
  const layout = useWindowDimensions();

  const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);

  const renderScene = SceneMap(
    Object.fromEntries(
      sceneMapping.map((item) => [
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

  const routes = sceneMapping.map((item) => ({
    key: item.key,
    title: item.title,
  }));

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
      <VStack
        className={twMerge("bg-background-0 flex-1", className)}
        // stickyHeaderIndices={[0]}
        // scrollEventThrottle={16}
        // showsVerticalScrollIndicator={false}
        {...rest}
      >
        <VStack
          space="md"
          className={twMerge(
            stickyContentClassName,
            "bg-background-0 py-4 shadow-sm"
          )}
        >
          {stickyContent}
        </VStack>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />

        {/* <VStack
          space="md"
          className={twMerge(vStackClassName, "bg-background-0 pb-4")}
        >
          {children}
        </VStack> */}
      </VStack>
      {/* <Tabs.Container
        renderHeader={renderHeader}
        revealHeaderOnScroll
        headerContainerStyle={{
          backgroundColor: "--color-background-0",
        }}
      >
        <Tabs.Tab name="A">
          <Tabs.ScrollView>{children}</Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="B">
          <Tabs.ScrollView>{children}</Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container> */}
    </>
  );
};

export default ScreenContainer;
const styles = StyleSheet.create({
  box: {
    height: 250,
    width: "100%",
  },
  boxA: {
    backgroundColor: "white",
  },
  boxB: {
    backgroundColor: "#D8D8D8",
  },
  header: {
    height: HEADER_HEIGHT,
    width: "100%",
    backgroundColor: "#2196f3",
  },
});
