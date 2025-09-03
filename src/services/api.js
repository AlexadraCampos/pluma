import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pluma-backend.onrender.com/api/users',
});


export default api; 