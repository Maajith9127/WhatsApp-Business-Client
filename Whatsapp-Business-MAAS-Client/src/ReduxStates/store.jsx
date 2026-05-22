import { configureStore } from "@reduxjs/toolkit";

import customerReducer from "./slices/customerSlice";
import invoicesReducer from './slices/invoiceSlice';
import templateStatsReducer from './slices/templateStatsSlice'; // <-- IMPORT
import globalErrorReducer from './slices/globalErrorSlice';



export const store = configureStore({
    reducer: {
        customer: customerReducer,
        invoices: invoicesReducer,
        templateStats: templateStatsReducer,
        globalError: globalErrorReducer,
    }
});
