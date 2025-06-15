import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchLoanRecords } from "./fetch-loan-record";
import { addLoanRecord } from "./add-loan-record";
import { updateLoanRecord } from "./update-loan-record";
import { deleteLoanRecord } from "./delete-loan-record";

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
    builder.addCase(updateLoanRecord.pending, (state) => {
      state.isUpdating = true;
    });
    builder.addCase(updateLoanRecord.fulfilled, (state) => {
      state.isUpdating = false;
    });
    builder.addCase(updateLoanRecord.rejected, (state) => {
      state.isUpdating = false;
    });
    builder.addCase(deleteLoanRecord.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteLoanRecord.fulfilled, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(deleteLoanRecord.rejected, (state) => {
      state.isDeleting = false;
    });
  },
});

export const {
  setLoanRecords,
  addLoanRecordSubscription,
  updateLoanRecordSubscription,
  deleteLoanRecordSubscription,
} = loanRecordSlice.actions;
export const loanRecordReducer = loanRecordSlice.reducer;
