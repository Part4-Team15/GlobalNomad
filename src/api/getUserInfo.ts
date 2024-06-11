import axiosInstance from '@/lib/axiosInstance';
import { UserInformation } from '@/types/header';

const getUserInfo = async (): Promise<UserInformation> => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

export default getUserInfo;
