import axios from 'axios';

// 'https://movie-mate-webapp-bakcend-production.up.railway.app'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8085',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
