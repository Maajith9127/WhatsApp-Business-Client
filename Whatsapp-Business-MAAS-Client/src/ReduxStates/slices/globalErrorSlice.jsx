// app/slices/globalErrorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState: null,
  reducers: {
    setError: (state, action) => action.payload,
    clearError: () => null,
  },
});

export const { setError, clearError } = globalErrorSlice.actions;
export default globalErrorSlice.reducer;
