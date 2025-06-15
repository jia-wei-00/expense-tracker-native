import { supabase } from "@/supabase";
import { AppDispatch } from "@/store";
import {
  addLoanRecordSubscription,
  deleteLoanRecordSubscription,
  updateLoanRecordSubscription,
} from "./loan-record-slice";

export const subscribeToLoanRecordChanges = ({
  userId,
  dispatch,
}: {
  userId: string;
  dispatch: AppDispatch;
}) => {
  const subscription = supabase.channel(userId + "_loan_record").on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "loan_record",
    },
    (payload) => {
      const { eventType, new: loanRecord, old } = payload;

      switch (eventType) {
        case "INSERT":
          dispatch(addLoanRecordSubscription(loanRecord));
          break;
        case "UPDATE":
          dispatch(updateLoanRecordSubscription(loanRecord));
          break;
        case "DELETE":
          dispatch(deleteLoanRecordSubscription(old));
          break;
        default:
          console.log("Unknown event type");
      }
    }
  );

  return subscription;
};
