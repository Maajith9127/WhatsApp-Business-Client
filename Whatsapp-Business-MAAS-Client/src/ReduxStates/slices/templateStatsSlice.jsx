// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // --- Dummy Data Updated with templateBody ---
// const dummyTemplates = [
//     {
//         id: 1,
//         templateName: 'order_confirmation',
//         status: 'approved',
//         category: 'Utility',
//         headerFormat: 'TEXT',
//         headerText: 'Order Confirmation',
//         templateBody: 'Hi {{1}}, thank you for your order #{{2}}. Your items will be shipped within 2 business days.',
//         footerText: 'Thanks for shopping with us!'
//     },
//     {
//         id: 2,
//         templateName: 'shipping_update_v2',
//         status: 'approved',
//         category: 'Marketing',
//         headerFormat: 'DOCUMENT',
//         headerText: '',
//         templateBody: 'Great news, {{1}}! Your package is on its way and will be delivered by {{2}}. Track it here: {{3}}',
//         footerText: 'Tap to view tracking link.'
//     },
//     {
//         id: 3,
//         templateName: 'abandoned_cart_reminder',
//         status: 'pending',
//         category: 'Marketing',
//         headerFormat: 'IMAGE',
//         headerText: '',
//         templateBody: 'Hi {{1}}, you left some items in your cart! Use code {{2}} for 15% off. Shop here: {{3}}',
//         footerText: 'Limited time offer!'
//     },
//     {
//         id: 4,
//         templateName: 'password_reset_flow',
//         status: 'rejected',
//         category: 'Authentication',
//         headerFormat: 'TEXT',
//         headerText: 'Reset Code',
//         templateBody: 'Your password reset code is {{1}}. This code is valid for 10 minutes.',
//         footerText: 'Don’t share this with anyone.'
//     },
//     {
//         id: 5,
//         templateName: 'monthly_newsletter',
//         status: 'approved',
//         category: 'Marketing',
//         headerFormat: 'VIDEO',
//         headerText: '',
//         templateBody: 'Hello {{1}}, check out our latest updates for {{2}}! Watch here: {{3}}',
//         footerText: 'Stay updated with us.'
//     },
//     {
//         id: 6,
//         templateName: 'payment_failed',
//         status: 'pending',
//         category: 'Utility',
//         headerFormat: 'TEXT',
//         headerText: 'Payment Issue',
//         templateBody: 'Hi {{1}}, your payment for order #{{2}} failed. Update your payment method here: {{3}}',
//         footerText: 'Need help? Contact support.'
//     },
//     {
//         id: 7,
//         templateName: 'welcome_message_promo',
//         status: 'rejected',
//         category: 'Marketing',
//         headerFormat: 'TEXT',
//         headerText: 'Welcome!',
//         templateBody: 'Welcome, {{1}}! Enjoy a 20% discount on your first order with code: WELCOME20',
//         footerText: 'Happy shopping!'
//     },
//     {
//         id: 8,
//         templateName: 'appointment_confirmation',
//         status: 'approved',
//         category: 'Utility',
//         headerFormat: 'TEXT',
//         headerText: 'Appointment Confirmed',
//         templateBody: 'Your appointment with {{1}} is confirmed for {{2}} at {{3}}.',
//         footerText: 'Please be on time.'
//     }
// ];


// // --- Async Thunk for Fetching Templates ---
// // (No changes needed here, the rest of the file remains the same)
// export const fetchTemplates = createAsyncThunk(
//     'templateStats/fetchTemplates',
//     async (filterStatus, { rejectWithValue }) => {
//         try {
//             await new Promise(resolve => setTimeout(resolve, 500));
//             if (filterStatus === 'all') {
//                 //We will pass the , the filter status to  the back end and then return what needs to be to the fron end
//                 return dummyTemplates;
//             }
//             const filteredData = dummyTemplates.filter(template => template.status === filterStatus);
//             return filteredData;
//         } catch (err) {
//             return rejectWithValue(err.message);
//         }
//     }
// );

// const initialState = {
//     items: [],
//     loading: false,
//     error: null,
//     filterStatus: 'all',
// };

// const templateStatsSlice = createSlice({
//     name: 'templateStats',
//     initialState,
//     reducers: {
//         setTemplateFilter(state, action) {
//             state.filterStatus = action.payload;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchTemplates.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchTemplates.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.items = action.payload;
//             })
//             .addCase(fetchTemplates.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { setTemplateFilter } = templateStatsSlice.actions;
// export default templateStatsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTemplatesFromServer } from '../../services/templateService';

// 🧠 Utility to capitalize category
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// 🔄 Thunk to fetch & transform backend template format
export const fetchTemplates = createAsyncThunk(
    'templateStats/fetchTemplates',
    async (filterStatus = 'all', { rejectWithValue }) => {
        try {
            const rawTemplates = await fetchTemplatesFromServer(); // GET from /template/invoice-template

            // 🔁 Convert backend format → frontend display format
            const transformed = rawTemplates.map((record) => {
                const components = record.components || [];

                const header = components.find(c => c.type === 'HEADER') || {};
                const body = components.find(c => c.type === 'BODY') || {};
                const footer = components.find(c => c.type === 'FOOTER') || {};

                return {
                    id: record.id,
                    templateName: record.name,
                    status: record.status?.toLowerCase() || 'pending',  // ✅ from DB now
                    category: capitalize(record.category.toLowerCase()),
                    headerFormat: header.format || '',
                    headerText: header.text || '',
                    templateBody: body.text || '',
                    footerText: footer.text || ''
                };
            });

            // 🎯 Frontend-side filtering
            if (filterStatus !== 'all') {
                return transformed.filter(template => template.status === filterStatus);
            }

            return transformed;

        } catch (err) {
            return rejectWithValue(err.response?.data?.error || err.message);
        }
    }
);

// 🔧 Initial state
const initialState = {
    items: [],
    loading: false,
    error: null,
    filterStatus: 'all', // Options: all, approved, pending, rejected
};

// 🧩 Redux slice
const templateStatsSlice = createSlice({
    name: 'templateStats',
    initialState,
    reducers: {
        setTemplateFilter(state, action) {
            state.filterStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTemplates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTemplates.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTemplates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Exports
export const { setTemplateFilter } = templateStatsSlice.actions;
export default templateStatsSlice.reducer;
