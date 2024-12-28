import React, { useState } from "react";
import { Button, ButtonIcon } from "@/components/ui/button";
import { MenuIcon } from "@/assets/Icons";
import Dropdown from "./Dropdown";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="md"
        className="rounded-full p-3 border-0"
        onPress={() => setIsOpen(!isOpen)}
      >
        <ButtonIcon as={MenuIcon} />
        {isOpen && <Dropdown />}
      </Button>
    </>
  );
};

export default Menu;
