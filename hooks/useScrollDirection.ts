import { useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export const useScrollDirection = (threshold = 10) => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
      setIsScrollingDown(currentScrollY > lastScrollY.current);
      lastScrollY.current = currentScrollY;
    }
  };

  return { isScrollingDown, handleScroll };
};
