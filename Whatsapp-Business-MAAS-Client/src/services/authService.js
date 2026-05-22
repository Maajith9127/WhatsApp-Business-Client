import axios from 'axios';
import axiosInstance from "./axiosInstance";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/user`;

export const register = (payload) =>
  axiosInstance.post(`/user/register`, payload);

export const login = (payload) =>
  axiosInstance.post(`/user/login`, payload);

export const verifyEmail = (code) =>
  axiosInstance.post(`/user/verify-email`, { code });

export const getUserDetails = () =>
  axiosInstance.get(`/user/user-details`);

export const logout = () =>
  axiosInstance.get(`/user/logout`);

// This axios has NO interceptors
export const refreshToken = async () => {
  const cleanAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // required to send cookies
  });

  try {
    const response = await cleanAxios.post('/user/refresh-token');
    return response.data;
  } catch (err) {
    console.error(" Refresh failed");
    throw err; // very important so interceptor can catch it
  }
};
