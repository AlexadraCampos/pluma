import axios from 'axios';


const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
  ? 'https://pluma-7rog.onrender.com/api'  
  : 'http://localhost:5000/api',

});           


export default api; 