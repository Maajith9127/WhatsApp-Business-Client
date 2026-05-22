import axiosInstance from './axiosInstance';

//  Get credential (WABA ID, business name, etc.)
export const getCredentials = async () => {
  const res = await axiosInstance.get('/credential/get');
  return res.data;
};

//  Get phone numbers
export const getPhoneNumber = async () => {
  const res = await axiosInstance.get('/credential/phone');
  return res.data?.phoneNumbers || [];
};

// Update credentials (only business name, for now)
export const updateCredentialDetails = async (payload) => {
  // backend doesn't have a dedicated update route yet
  // so either use `create` as upsert, or make a PUT route
  const res = await axiosInstance.post('/credential/create', payload);
  return res.data;
};
