import axiosInstance from '@/lib/axiosInstance';

const getUserInfo = async (): Promise<any> => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

export default getUserInfo;
