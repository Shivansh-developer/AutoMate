import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://automate-4n8b.onrender.com/api',
});

export default axiosInstance;