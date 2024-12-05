import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./features/counter/counter-slice";
import { authReducer } from "./features/authentication/auth-slice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
