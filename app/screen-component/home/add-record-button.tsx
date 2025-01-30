import React from "react";
import { Fab, FabIcon } from "@/components/ui/fab";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PlusIcon } from "@/assets/Icons";

interface AddRecordButtonProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const AddRecordButton = ({ showModal, setShowModal }: AddRecordButtonProps) => {
  const rotate = useSharedValue<number>(30);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  React.useEffect(() => {
    rotate.value = withSpring(showModal ? 90 : 0, {
      stiffness: 100,
      damping: 10,
    });
  }, [showModal]);
  return (
    <Fab
      size="md"
      placement="bottom right"
      className="rounded-lg"
      onPress={() => {
        setShowModal(true);
      }}
    >
      <Animated.View style={[animatedStyle]}>
        <FabIcon as={PlusIcon} />
      </Animated.View>
    </Fab>
  );
};

export default AddRecordButton;
