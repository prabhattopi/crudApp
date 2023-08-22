import axios from 'axios';

const api = axios.create({
  baseURL: 'https://4000-prabhattopi-curdappback-uza1soy1pjc.ws-us104.gitpod.io/api', // Set the base URL for your backend API
});

export default api;
