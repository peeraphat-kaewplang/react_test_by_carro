import axios from 'axios'

const version = "1"

const API_URL = `https://localhost:7258/api/v${version}/`;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const api = axios.create({
  baseURL: API_URL
});

export default api;