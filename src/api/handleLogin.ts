import { AxiosError } from 'axios';
import axiosInstance from '../lib/axiosInstance';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('에러 발생:', error.message);
    } else {
      console.error('에러 발생:', error);
    }
  }
};

export default handleLogin;
