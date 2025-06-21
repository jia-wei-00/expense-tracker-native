import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthError } from "@supabase/supabase-js";
import { showErrorToast, showServerErrorToast } from "@/utils/toast-helpers";

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
            showErrorToast("Toast.Unknown auth state change");
            break;
        }
      });
      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        showServerErrorToast(error.message);
      } else {
        showServerErrorToast(JSON.stringify(error));
      }
      throw error;
    }
  }
);
