import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loanRecords: [],
};

const loanRecordSlice = createSlice({
  name: "loanRecord",
  initialState,
  reducers: {},
});

export const fetchLoanRecords = createAsyncThunk(
  "loanRecord/fetchLoanRecords",
  async () => {
    const response = await fetchLoanRecords();
    return response.data;
  }
);

export const { setLoanRecords } = loanRecordSlice.actions;

export default loanRecordSlice.reducer;
