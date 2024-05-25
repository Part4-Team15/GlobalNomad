import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/4-15',
});

export default axiosInstance;
