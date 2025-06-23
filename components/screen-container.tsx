import React from "react";
import { VStack } from "@/components/ui/vstack";
import { LayoutChangeEvent, ScrollView } from "react-native";
import { twMerge } from "tailwind-merge";
import { useScrollDirection } from "@/hooks";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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
  const { isScrollingDown, handleScroll } = useScrollDirection();
  const containerHeight = useSharedValue<number>(0);
  const isScrollingDownShared = useSharedValue<boolean>(false);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    containerHeight.value = height;
  };

  // Update shared value when scroll direction changes
  React.useEffect(() => {
    isScrollingDownShared.value = isScrollingDown;
  }, [isScrollingDown]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            isScrollingDownShared.value ? -containerHeight.value : 0,
            {
              damping: 15,
              stiffness: 150,
              mass: 1,
              overshootClamping: false,
              restDisplacementThreshold: 0.01,
              restSpeedThreshold: 2,
            }
          ),
        },
      ],
    };
  });

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      className={twMerge("bg-background-0", className)}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      {...rest}
    >
      <Animated.View style={animatedStyle} onLayout={handleLayout}>
        <VStack
          space="md"
          className={twMerge(stickyContentClassName, "bg-background-0 p-2")}
        >
          {stickyContent}
        </VStack>
      </Animated.View>
      <VStack
        space="md"
        className={twMerge(vStackClassName, "bg-background-0 px-2 ")}
      >
        {children}
      </VStack>
    </ScrollView>
  );
};

export default ScreenContainer;
