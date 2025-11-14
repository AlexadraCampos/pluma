import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://backend-pluma.onrender.com/api"
      : "http://localhost:10000/api",
});    

export default api; 