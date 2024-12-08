import React, { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { View } from "react-native";
import { setSession } from "../store/features/authentication/auth-slice";
import { RootState } from "../store";
import { Login } from "../pages";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const userSession = useAppSelector((state: RootState) => state.auth.session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });
  }, []);

  return <View>{userSession ? children : <Login />}</View>;
};

export default Auth;
