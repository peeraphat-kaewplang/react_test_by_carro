import axios from 'axios'

const version = "1"

export const API_URL = `https://localhost:7258/api/v${version}/`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization :  `Bearer ${localStorage.getItem("token")}`
    }
});

export default api;