import { supabase } from "@/supabase";
import {
  addExpenseSubscription,
  deleteExpenseSubscription,
  updateExpenseSubscription,
} from "../..";
import { useAppDispatch } from "@/hooks/useRedux";
import { AppDispatch } from "@/store";

export const subscribeToExpenseChanges = ({
  userId,
  dispatch,
}: {
  userId: string;
  dispatch: AppDispatch;
}) => {
  const subscription = supabase.channel(userId).on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "expense",
    },
    (payload) => {
      const { eventType, new: expense, old } = payload;

      switch (eventType) {
        case "INSERT":
          dispatch(addExpenseSubscription(expense));
          break;
        case "UPDATE":
          dispatch(updateExpenseSubscription(expense));
          break;
        case "DELETE":
          dispatch(deleteExpenseSubscription(old));
          break;
        default:
          console.log("Unknown event type");
      }
    }
  );

  return subscription;
};
