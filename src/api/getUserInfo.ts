import axiosInstance from '@/lib/axiosInstance';
import { UserInformation } from '@/types/header';

const getUserInfo = async (): Promise<UserInformation> => {
  try {
    const response = await axiosInstance.get('/users/me');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getUserInfo;
