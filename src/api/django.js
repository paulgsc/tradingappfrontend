import axios from 'axios';

const API = axios.create({
  baseURL: 'https://tradingapp.up.railway.app/api/'
});

export default API;
