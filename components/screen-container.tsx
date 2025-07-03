import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
import { twMerge } from "tailwind-merge";
import { View, StyleSheet, ListRenderItem } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";

const HEADER_HEIGHT = 250;

const DATA = [0, 1, 2, 3, 4];
const identity = (v: unknown): string => v + "";

const Header = () => {
  return <View style={styles.header} />;
};

interface ScreenContainerProps extends React.ComponentProps<typeof ScrollView> {
  children: React.ReactNode;
  vStackClassName?: string;
  stickyContentClassName?: string;
  stickyContent?: React.ReactNode;
}

const ScreenContainer = ({
  children,
  vStackClassName,
  className,
  stickyContent,
  stickyContentClassName,
  ...rest
}: ScreenContainerProps) => {
  const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);

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
      {/* <ScrollView
        className={twMerge("bg-background-0 flex-1", className)}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
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

        <VStack
          space="md"
          className={twMerge(vStackClassName, "bg-background-0 pb-4")}
        >
          {children}
        </VStack>
      </ScrollView> */}
      {/* <ScrollView className={twMerge("d-d", className)} {...rest}> */}
      <Tabs.Container
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
      </Tabs.Container>
      {/* </ScrollView> */}
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
