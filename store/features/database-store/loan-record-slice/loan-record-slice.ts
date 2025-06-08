import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";

export type LoanRecord = Database["public"]["Tables"]["loan_record"]["Row"];

interface LoanRecordState {
  loanRecords: LoanRecord[];
  totalCount: number;
  isFetching: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
}

const initialState: LoanRecordState = {
  loanRecords: [],
  totalCount: 0,
  isFetching: false,
  isSubmitting: false,
  isDeleting: false,
  isUpdating: false,
};

const loanRecordSlice = createSlice({
  name: "loanRecord",
  initialState,
  reducers: {
    setLoanRecords: (state, action) => {
      state.loanRecords = action.payload;
    },
  },
});

export const { setLoanRecords } = loanRecordSlice.actions;
export const loanRecordReducer = loanRecordSlice.reducer;
