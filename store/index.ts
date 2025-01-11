import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./features/counter/counter-slice";
import { authReducer } from "./features/authentication/auth-slice";
import { supabaseAuthSlice } from "./features/authentication/supabase-auth-slice";
import { expenseReducer } from "./features/database-store";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    expense: expenseReducer,
    [supabaseAuthSlice.reducerPath]: supabaseAuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(supabaseAuthSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
