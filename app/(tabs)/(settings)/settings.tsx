import { ScreenContainer } from "@/components";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { supabase } from "@/supabase";
import React from "react";

const Settings = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ScreenContainer>
      <Divider />
      <Button onPress={handleLogout}>
        <ButtonText>Log Out</ButtonText>
      </Button>
    </ScreenContainer>
  );
};

export default Settings;
