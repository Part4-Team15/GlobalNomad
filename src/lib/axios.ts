import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/4-15/',
  withCredentials: true,
});

export default instance;
