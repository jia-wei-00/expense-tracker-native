import { configureStore } from "@reduxjs/toolkit";
import { settingsReducer } from "./features/settings";
import { authReducer } from "./features/authentication/auth-slice";
import { scrollReducer } from "./features/scroll/scroll-slice";
import { expenseReducer, categoryReducer } from "./features/database-store";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
    expense: expenseReducer,
    category: categoryReducer,
    scroll: scrollReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
