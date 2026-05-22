import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//  Dummy Customer List
const dummyCustomers = [
  {
    id: "cust1",
    name: "John Doe",
    phone: "+91-9876543210",
    email: "john@example.com",
    address: "123 Main Street, Mumbai"
  },
  {
    id: "cust2",
    name: "Jane Smith",
    phone: "+91-9123456780",
    email: "jane@example.com",
    address: "456 Park Lane, Chennai"
  },
  {
    id: "cust3",
    name: "Arjun Kumar",
    phone: "+91-9988776655",
    email: "arjun.kumar@gmail.com",
    address: "17 Indira Nagar, Bangalore"
  },
  {
    id: "cust4",
    name: "Fatima Bano",
    phone: "+91-8888444433",
    email: "fatima.bano@yahoo.com",
    address: "89 Nampally Street, Hyderabad"
  },
  {
    id: "cust5",
    name: "Raj Patel",
    phone: "+91-9090909090",
    email: "raj.patel@outlook.com",
    address: "10 MG Road, Ahmedabad"
  },
  {
    id: "cust6",
    name: "Sneha Reddy",
    phone: "+91-9012345678",
    email: "sneha.r@gmail.com",
    address: "26 Jubilee Hills, Hyderabad"
  },
  {
    id: "cust7",
    name: "Yusuf Khan",
    phone: "+91-7777777777",
    email: "yusuf.khan@live.com",
    address: "55 Crawford Market, Mumbai"
  },
  {
    id: "cust8",
    name: "Priya Sharma",
    phone: "+91-9666666666",
    email: "priya.sharma@hotmail.com",
    address: "4 Civil Lines, Jaipur"
  },
  {
    id: "cust9",
    name: "Rohan Mehta",
    phone: "+91-9871112223",
    email: "rohan.mehta@me.com",
    address: "3 Sector 15, Gurgaon"
  },
  {
    id: "cust10",
    name: "Anjali Verma",
    phone: "+91-9999990000",
    email: "anjali.verma@gmail.com",
    address: "7 Alambagh, Lucknow"
  }
];

// 🔁 Async thunk for fetching customers
export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // simulate delay
      return dummyCustomers;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 🔁 Initial state
const initialState = {
  selectedCustomerId: "",
  customerData: {
    name: "",
    phone: "",
    email: "",
    address: ""
  },
  customerList: [],
  loading: false,
  error: null
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    selectCustomer: (state, action) => {
      state.selectedCustomerId = action.payload;
    },
    updateCustomerField: (state, action) => {
      const { field, value } = action.payload;
      state.customerData[field] = value;
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    resetCustomer: (state) => {
      state.selectedCustomerId = "";
      state.customerData = {
        name: "",
        phone: "",
        email: "",
        address: ""
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customerList = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  selectCustomer,
  updateCustomerField,
  setCustomerData,
  resetCustomer
} = customerSlice.actions;

export default customerSlice.reducer;
