import React, { useState } from "react";
import { Button, ButtonIcon } from "@/components/ui/button";
import { MenuIcon } from "@/assets/Icons";
import DropdownBox from "./DropdownBox";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Button
      variant="outline"
      size="md"
      className="rounded-full p-3 border-0"
      onPress={() => setIsOpen(!isOpen)}
    >
      <ButtonIcon as={MenuIcon} />
      {isOpen && <DropdownBox />}
    </Button>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
