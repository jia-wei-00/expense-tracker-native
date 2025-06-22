import { supabase } from "@/supabase";
import { AppDispatch } from "@/store";
import { loanSlice } from "./loan-slice";

export const subscribeToLoanChanges = ({
  userId,
  dispatch,
}: {
  userId: string;
  dispatch: AppDispatch;
}) => {
  const subscription = supabase.channel(userId + "_loan").on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "loan",
    },
    (payload) => {
      const { eventType, new: loan, old } = payload;

      switch (eventType) {
        case "INSERT":
          dispatch(loanSlice.actions.addLoanSubscription(loan));
          break;
        case "UPDATE":
          dispatch(loanSlice.actions.updateLoanSubscription(loan));
          break;
        case "DELETE":
          dispatch(loanSlice.actions.deleteLoanSubscription(old));
          break;
        default:
          console.log("Unknown event type");
      }
    }
  );

  return subscription;
};
