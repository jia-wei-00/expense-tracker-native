import React, { useState } from "react";
import { Button, ButtonIcon } from "@/components/ui/button";
import { MenuIcon } from "@/assets/Icons";
import DropdownBox from "./DropdownBox";
import { TouchableWithoutFeedback } from "react-native";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} onBlur={handlePress}>
      <Button variant="outline" size="md" className="rounded-full p-3 border-0">
        <ButtonIcon as={MenuIcon} />
        {isOpen && <DropdownBox />}
      </Button>
    </TouchableWithoutFeedback>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
