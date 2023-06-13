import axios from 'axios';

const api = axios.create({
  baseURL: "https://3000-prabhattopi-crudapp-q3080nzq12a.ws-us99.gitpod.io/api/", // Set the base URL for your backend API
  timeout: 5000, // Set a timeout for requests (optional)
  // Additional default settings if needed
});

export default api;
