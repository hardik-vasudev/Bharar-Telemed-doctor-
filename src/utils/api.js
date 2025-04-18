import axios from 'axios';

const base = import.meta.env.MODE === 'development'
  ? '/api'
  : import.meta.env.VITE_API_BASE_URL;

export default axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' }
});
