import axiosInstance from './axiosInstance';

// Get user basic info
export const getUserDetails = async () => {
  const res = await axiosInstance.get('/user/user-details');
  return res.data?.data;
};

// Update user info (name, email, mobile, etc.)
export const updateUserDetails = async (payload) => {
  const res = await axiosInstance.put('/user/update-user', payload);
  return res.data;
};

// Upload avatar
export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await axiosInstance.put('/user/upload-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return response.data;
};
