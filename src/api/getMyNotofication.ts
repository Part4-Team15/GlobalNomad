import axiosInstance from '@/lib/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';

const getMyNotification = async ({ pageParam }: QueryFunctionContext): Promise<any> => {
  const cursorParam = pageParam ? `&cursorId=${pageParam}` : '';
  const response = await axiosInstance.get(`/my-notifications?size=4${cursorParam}`);
  return response.data;
};

export default getMyNotification;
