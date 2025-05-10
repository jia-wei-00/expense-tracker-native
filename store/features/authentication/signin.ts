import { supabase } from "@/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupPayload } from "./auth-slice";
import { toast } from "sonner-native";
import { AuthError, Provider } from "@supabase/supabase-js";
import {
  signUpWithGoogle,
  signIn as CMSignIn,
} from "react-native-credentials-manager";
import * as WebBrowser from "expo-web-browser";
import { createSessionFromUrl } from "./session";

const googleWebClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "";

export type ProviderType = "passkeys" | "password" | "google-signin";
export type SignInWithOAuthPayload = {
  provider: Provider;
  redirectTo: string;
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload: SignupPayload) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) throw error;

      const name =
        data.session.user.user_metadata.display_name || data.session.user.email;

      toast.success(`Welcome, ${name}!`);
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

export const signInWithOAuth = createAsyncThunk(
  "auth/signInWithOAuth",
  async (payload: SignInWithOAuthPayload, { dispatch }) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: payload.provider,
        options: {
          redirectTo: payload.redirectTo,
          skipBrowserRedirect: true,
        },
      });
      if (error) throw error;
      const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? "",
        payload.redirectTo
      );
      if (res.type === "success") {
        const { url } = res;
        await dispatch(createSessionFromUrl(url));
      } else {
        throw new Error("Sign in unsuccessful");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(JSON.stringify(error));
      }
      throw error;
    }
  }
);

export const signInWithGoogleCredentialsManager = createAsyncThunk(
  "auth/signInWithGoogleCredentialsManager",
  async (provider: ProviderType) => {
    try {
      const credential = await CMSignIn(
        ["passkeys", "password", "google-signin"],
        {
          passkeys: {
            challenge: "1234567890",
            timeout: 1800000,
            userVerification: "required",
            rpId: "com.jia011.expensetrackernative",
          },
          googleSignIn: {
            serverClientId:
              "446882197354-r1pmvn1ov63uu506f0n4n6lrhk8r96e7.apps.googleusercontent.com",
            autoSelectEnabled: true,
          },
        }
      );

      switch (credential.type) {
        case "passkey":
          console.log(
            "Passkey auth response:",
            credential.authenticationResponseJson
          );
          break;
        case "password":
          console.log("Password auth:", credential.username);
          break;
        case "google-signin":
          console.log("Google auth:", credential.idToken);
          break;
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  }
);
