
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor to add the session token to all requests
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('sessionToken');

    // headers: { Authorization: `Bearer ${sessionToken}` }
    if (token) {
      config.headers['Authorization'] = `${token}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default axiosInstance;
