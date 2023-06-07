import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Set the base URL for your backend API
  timeout: 5000, // Set a timeout for requests (optional)
  // Additional default settings if needed
});

export default api;
