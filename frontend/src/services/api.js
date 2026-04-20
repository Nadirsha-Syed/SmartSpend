import axios from 'axios';

const api = axios.create({ 
  baseURL: 'http://localhost:5000/api'
});

// Request Interceptor: Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server says 401 or 403, the token is likely expired or invalid
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Force re-login
    }
    return Promise.reject(error);
  }
);

export default api;
