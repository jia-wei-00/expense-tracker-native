import { Database } from "@/database.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loanRecords: [],
};

const loanRecordSlice = createSlice({
  name: "loanRecord",
  initialState,
  reducers: {},
});

export const { setLoanRecords } = loanRecordSlice.actions;

export default loanRecordSlice.reducer;
