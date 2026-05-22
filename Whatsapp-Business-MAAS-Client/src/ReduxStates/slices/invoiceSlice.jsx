import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInvoices as fetchInvoicesAPI } from '../../services/invoiceService';

// --- Async Thunk for Fetching Invoices ---
// This simulates an API call. You can replace the inside of this function
// with your actual `fetch` logic later.

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (filterSettings, { rejectWithValue }) => {
    try {
      console.log("Fetching invoices with filter:", filterSettings);
      const data = await fetchInvoicesAPI(); // ← actual backend call

      const { status, startDate, endDate } = filterSettings;

      const filteredData = data.filter((invoice) => {
        const matchesStatus =
          status === 'all' || invoice.status.toLowerCase() === status.toLowerCase();

        const createdAt = new Date(invoice.created_at);
        const matchesStartDate = !startDate || createdAt >= new Date(startDate);
        const matchesEndDate = !endDate || createdAt <= new Date(endDate);

        return matchesStatus && matchesStartDate && matchesEndDate;
      });

      return filteredData;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);


const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filterSettings: {
    status: 'all',
    startDate: '',
    endDate: ''
  }
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filterSettings.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        // In a real app, you might want to store all items and filtered items separately.
        // For this example, we'll just update the main list.
        state.items = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter } = invoicesSlice.actions;
export default invoicesSlice.reducer;