import axiosInstance from '@/lib/axiosInstance';

import { QueryFunctionContext } from '@tanstack/react-query';

const getMyActivity = async ({ queryKey, pageParam }: QueryFunctionContext): Promise<any> => {
  const cursorParam = pageParam ? `cursorId=${pageParam}` : '';
  const response = await axiosInstance.get(`/my-activities?${cursorParam}&size=5`);
  return response.data;
};

export default getMyActivity;
