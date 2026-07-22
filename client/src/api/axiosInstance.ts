import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sunny-celebration-production-3859.up.railway.app/api',
});

export default axiosInstance;