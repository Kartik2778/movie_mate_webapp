import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://serene-joy-production.up.railway.app',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Replace with your token storage logic
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
