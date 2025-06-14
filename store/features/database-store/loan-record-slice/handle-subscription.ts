import { supabase } from "@/supabase";
import { AppDispatch } from "@/store";
import { addLoanRecordSubscription, deleteLoanRecordSubscription, updateLoanRecordSubscription } from "./loan-record-slice";

export const subscribeToLoanRecordChanges = ({
  userId,
  dispatch,
}: {
  userId: string;
  dispatch: AppDispatch;
}) => {