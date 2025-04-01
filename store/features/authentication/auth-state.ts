import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner-native";

export const getAuthStateChange = createAsyncThunk(
  "auth/getAuthStateChange",
  async () => {
    try {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        switch (event) {
          case "INITIAL_SESSION":
            console.log("INITIAL_SESSION");
          case "PASSWORD_RECOVERY":
            console.log("PASSWORD_RECOVERY");
          case "SIGNED_IN":
            console.log("SIGNED_IN");
            break;
          case "SIGNED_OUT":
            console.log("SIGNED_OUT");
            break;
          case "TOKEN_REFRESHED":
            console.log("TOKEN_REFRESHED");
          case "USER_UPDATED":
            console.log("USER_UPDATED");
          case "MFA_CHALLENGE_VERIFIED":
            console.log("MFA_CHALLENGE_VERIFIED");
          default:
            toast.error("Unknown auth state changeevent");
            break;
        }
      });
      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
      } else {
        toast.error(JSON.stringify(error));
      }
      throw error;
    }
  }
);
