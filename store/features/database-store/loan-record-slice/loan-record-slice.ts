import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchLoanRecords } from "./feth-loan-record";
import { addLoanRecord } from "./add-loan-record";

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
    addLoanRecordSubscription: (state, action) => {
      state.loanRecords.push(action.payload);
    },
    updateLoanRecordSubscription: (state, action) => {
      const index = state.loanRecords.findIndex(
        (loanRecord) => loanRecord.id === action.payload.id
      );
      if (index !== -1) {
        state.loanRecords[index] = action.payload;
      }
    },
    deleteLoanRecordSubscription: (state, action) => {
      state.loanRecords = state.loanRecords.filter(
        (loanRecord) => loanRecord.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoanRecords.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchLoanRecords.fulfilled, (state, action) => {
      state.isFetching = false;
      state.loanRecords = action.payload;
    });
    builder.addCase(fetchLoanRecords.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(addLoanRecord.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(addLoanRecord.fulfilled, (state, action) => {
      state.isSubmitting = false;
    });
    builder.addCase(addLoanRecord.rejected, (state) => {
      state.isSubmitting = false;
    });
  },
});

export const { setLoanRecords } = loanRecordSlice.actions;
export const loanRecordReducer = loanRecordSlice.reducer;
