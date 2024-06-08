import axiosInstance from '@/lib/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';

const getMyActivity = async ({ queryKey, pageParam }: QueryFunctionContext): Promise<any> => {
  try {
    const [, size] = queryKey;
    const cursorParam = pageParam ? `&cursorId=${pageParam}` : '';
    const response = await axiosInstance.get(`/my-activities?size=${size}${cursorParam}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching My activity data:', error);
    throw error;
  }
};

export default getMyActivity;
