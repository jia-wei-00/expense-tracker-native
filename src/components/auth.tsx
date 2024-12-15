import React, { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { setSession } from "../store/features/authentication/auth-slice";
import { useAppDispatch } from "../hooks/useRedux";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });
  }, []);

  return children;
};

export default Auth;
