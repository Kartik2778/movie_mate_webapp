import axios from 'axios';

// 'https://movie-mate-webapp-bakcend-production.up.railway.app'

const axiosInstance = axios.create({
  baseURL: 'https://moviemate-backend-tb76.onrender.com',
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
