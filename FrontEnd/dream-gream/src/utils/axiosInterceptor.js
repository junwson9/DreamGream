// axiosInstance.js
/* eslint-disable */
import axios from 'axios';
import { API_URL } from '../config';

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');

    if (
      error.response &&
      error.response.status === 500 &&
      error.response.message === 'EXPIRED TOKEN' &&
      refreshToken
    ) {
      try {
        const res = await axiosInstance.post(
          '/auth/token',
          {},
          { headers: { 'X-Refresh-Token': refreshToken } },
        );
        const newAccessToken = res.data.access_token;
        localStorage.setItem('token', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
