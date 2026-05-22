import axios from 'axios';
import { refreshToken } from './authService';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, //  sends cookies automatically
});


//  Intercept 401 and try refresh
axiosInstance.interceptors.response.use(
    res => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await refreshToken(); // refreshToken endpoint will rotate tokens in cookies
                return axiosInstance(originalRequest); // retry original request
            } catch (refreshErr) {
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(err);
    }
);

export default axiosInstance;
