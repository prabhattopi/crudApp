import axios from 'axios';

const api = axios.create({
  baseURL:"https://backend-mrbv.onrender.com/api", // Set the base URL for your backend API
});

export default api;
