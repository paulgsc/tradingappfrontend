import axios from 'axios';

const API = axios.create({
  baseURL: 'https://tradingapp.up.railway.app/api/'
  // baseURL: 'http://127.0.0.1:8000/api/'
});

export default API;
