// lib/axios.ts
import axios from 'axios';
// import { getCookie, setCookie, deleteCookie } from '@/lib/cookies';

const API_URL = 'http://127.0.0.1:3000/api/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getCookie('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = getCookie('refreshToken');
//       if (refreshToken) {
//         try {
//           const { data } = await axios.post(`${API_URL}/auth/jwt/refresh/`, { refresh: refreshToken }, { withCredentials: true });
//           setCookie('token', data.access);
//           originalRequest.headers.Authorization = `Bearer ${data.access}`;
//           return axiosInstance(originalRequest);
//         } catch (err) {
//           deleteCookie('token');
//           deleteCookie('refreshToken');
//           window.location.href = '/login';
//           return Promise.reject(err);
//         }
//       } else {
//         deleteCookie('token');
//         deleteCookie('refreshToken');
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
