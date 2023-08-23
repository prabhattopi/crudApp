import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.VITE_API_URL, // Set the base URL for your backend API
});

export default api;
