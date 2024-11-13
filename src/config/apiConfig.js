import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://serene-joy-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`, // Optional: Add default authorization header
  },
});

export default axiosInstance;
