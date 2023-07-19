import axios from 'axios';

const API = axios.create({
  baseURL:  import.meta.env.DEV ? 'http://127.0.0.1:8000/api/' : 'https://tradingapp.up.railway.app/api/'
});

export default API;
