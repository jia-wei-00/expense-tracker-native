import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/supabase";
import { setLoading, setSession } from "./auth-slice";

export const supabaseAuthSlice = createApi({
  reducerPath: "supabaseAuth",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    signIn: build.mutation({
      queryFn: async ({ email, password }, { dispatch }) => {
        dispatch(setLoading(true));

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        dispatch(setSession(data.session));
        dispatch(setLoading(false));

        return { data: "success" };
      },
    }),
    signUp: build.mutation({
      queryFn: async ({ email, password }, { dispatch }) => {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) throw error;
        dispatch(setSession(data.session));
        dispatch(setLoading(false));

        return { data: "Check your email for verification" };
      },
    }),
    signOut: build.mutation({
      queryFn: async (_, { dispatch }) => {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;
        dispatch(setSession(null));
        return { data: "success" };
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
  supabaseAuthSlice;
