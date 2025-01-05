import React from "react";
import { Box } from "./ui/box";
import { VStack } from "./ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useSignOutMutation } from "@/store/features";

const DropdownBox = () => {
  const [signOut, { isLoading: isSignOutLoading }] = useSignOutMutation();

  return (
    <Box className="absolute top-[38px] right-0">
      <VStack space="md" reversed={false}>
        <Button onPress={() => signOut("")}>
          <ButtonText>
            {isSignOutLoading ? "Logging out..." : "Logout"}
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};

DropdownBox.displayName = "DropdownBox";

export default DropdownBox;
