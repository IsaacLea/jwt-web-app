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
    const jwt = localStorage.getItem('accessToken');

    if (jwt) {
      config.headers['Authorization'] = `Bearer ${jwt}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// Response interceptor to handle token expiration and refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors by using the refresh token to get a new access token and retry the request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const response = await axios.post(
          'http://localhost:3000/api/refresh-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (response.status === 200) {
          const newToken = response.data.token;
          localStorage.setItem('sessionToken', newToken);
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);

        // Redirect to login page
        window.location.href = '/logon';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
