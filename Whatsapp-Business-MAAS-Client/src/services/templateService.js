import axiosInstance from './axiosInstance';

// Fetch templates from backend
export const fetchTemplatesFromServer = async (status = 'all') => {
  const res = await axiosInstance.get('/template/invoice-template', {
    params: { status }, // optional if filter is supported on backend
  });
  return res.data;
};

// Submit new template to backend
export const submitTemplate = async (payload) => {
  const res = await axiosInstance.post('/template/invoice-template', payload);
  return res.data;
};


