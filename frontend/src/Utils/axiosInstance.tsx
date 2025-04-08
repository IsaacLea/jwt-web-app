
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  // withCredentials: true, // Include credentials in requests.  Required for the express-session server implementation
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to add the session token to all requests
axiosInstance.interceptors.request.use(
  config => {
    const jwt = localStorage.getItem('sessionToken');

    // headers: { Authorization: `Bearer ${sessionToken}` }
    if (jwt) {
      config.headers['Authorization'] = `Bearer ${jwt}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default axiosInstance;
