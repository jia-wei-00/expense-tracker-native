import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchLoans } from "./fetch-loan";
import { addLoan } from "./add-loan";
import { updateLoan } from "./update-loan";
import { deleteLoan } from "./delete-loan";

export type Loan = Database["public"]["Tables"]["loan"]["Row"];

interface LoanState {
  loans: Loan[];
  totalCount: number;
  isFetching: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
}

const initialState: LoanState = {
  loans: [],
  totalCount: 0,
  isFetching: false,
  isSubmitting: false,
  isDeleting: false,
  isUpdating: false,
};

export const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoans: (state, action) => {
      state.loans = action.payload;
    },
    addLoanSubscription: (state, action) => {
      state.loans.push(action.payload);
    },
    updateLoanSubscription: (state, action) => {
      const index = state.loans.findIndex(
        (loan) => loan.id === action.payload.id
      );
      state.loans[index] = action.payload;
    },
    deleteLoanSubscription: (state, action) => {
      const index = state.loans.findIndex(
        (loan) => loan.id === action.payload.id
      );
      state.loans.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoans.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchLoans.fulfilled, (state, action) => {
      state.isFetching = false;
      state.loans = action.payload;
    });
    builder.addCase(fetchLoans.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(addLoan.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(addLoan.fulfilled, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(addLoan.rejected, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(updateLoan.pending, (state) => {
      state.isUpdating = true;
    });
    builder.addCase(updateLoan.fulfilled, (state) => {
      state.isUpdating = false;
    });
    builder.addCase(updateLoan.rejected, (state) => {
      state.isUpdating = false;
    });
    builder.addCase(deleteLoan.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteLoan.fulfilled, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(deleteLoan.rejected, (state) => {
      state.isDeleting = false;
    });
  },
});

export const { setLoans } = loanSlice.actions;

export default loanSlice.reducer;
