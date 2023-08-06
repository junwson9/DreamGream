// axiosInstance.js
/* eslint-disable */
import axios from 'axios';
import store from '../store/store';

const axiosInstance = axios.create({
  baseURL: 'http://i9a609.p.ssafy.io:8000',
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = store.getState().authReducer;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    const { refreshToken } = store.getState().authReducer;

    if (error.response && error.response.status === 401 && refreshToken) {
      try {

        const res = await axios.post('/auth/token', { X_Refresh_token: refreshToken });
        const newAccessToken = res.data.access_token;
        store.dispatch({ type: 'SET_TOKEN', payload: { accessToken: newAccessToken } });


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
