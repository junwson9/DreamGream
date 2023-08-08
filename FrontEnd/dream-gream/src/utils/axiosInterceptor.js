// axiosInstance.js
/* eslint-disable */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://i9a609.p.ssafy.io:8000',
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
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');

    if (error.response && error.response.status === 401 && refreshToken) {
      try {

        const res = await axiosInstance.post('/auth/token', {}, { headers: { 'X-Refresh-Token': refreshToken } });
        const newAccessToken = res.data.access_token;
        localStorage.setItem('token', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
