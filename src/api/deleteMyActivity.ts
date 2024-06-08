import axiosInstance from '@/lib/axiosInstance';
import { AxiosError } from 'axios';

const deleteMyActivity = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/my-activities/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.error(error.response.data.message);
      throw error.response.data.message;
    } else {
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
};

export default deleteMyActivity;
