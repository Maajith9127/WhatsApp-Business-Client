import axiosInstance from './axiosInstance';

// 1. Send New Invoice (with file)
export const createInvoice = async (formData) => {
  try {
    const response = await axiosInstance.post('/invoice', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (err) {
    console.error(" Error creating invoice:", err);
    throw err;
  }
};

// 2. Get All Invoices for Logged-in User
export const fetchInvoices = async () => {
  try {
    const response = await axiosInstance.get('/invoice');
    return response.data;
  } catch (err) {
    console.error(" Error fetching invoices:", err);
    throw err;
  }
};

// 3. Get Single Invoice by ID
export const fetchInvoiceById = async (id) => {
  try {
    const response = await axiosInstance.get(`/invoice/${id}`);
    return response.data;
  } catch (err) {
    console.error(`❌ Error fetching invoice with ID ${id}:`, err);
    throw err;
  }
};


