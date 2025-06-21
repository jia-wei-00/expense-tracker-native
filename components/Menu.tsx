import React, { useState } from "react";
import { MenuIcon } from "@/assets/Icons";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Button, ButtonIcon } from "@/components/ui/button";
import { useSignOutMutation } from "@/store/features";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const { t } = useTranslation();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [signOut, { isLoading: isSignOutLoading }] = useSignOutMutation();

  const handleClose = () => {
    setShowActionsheet(false);
  };

  const handleSignOut = () => {
    signOut("");
    !isSignOutLoading && handleClose();
  };

  return (
    <>
      <Button
        variant="outline"
        className="border-0"
        onPress={() => setShowActionsheet(true)}
      >
        <ButtonIcon as={MenuIcon} />
      </Button>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={handleSignOut}>
            <ActionsheetItemText>
              {isSignOutLoading ? t("Logging out...") : t("Logout")}
            </ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default Menu;
