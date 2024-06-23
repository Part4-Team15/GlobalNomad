import axiosInstance from '@/lib/axiosInstance';
import { MyActivityType } from '@/types/myActivityPage';

import { QueryFunctionContext } from '@tanstack/react-query';

const getMyActivity = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext): Promise<MyActivityType> => {
  const [, size] = queryKey;
  const cursorParam = pageParam ? `&cursorId=${pageParam}` : '';
  const dataSize = size ? `?size=${size}` : '';
  const response = await axiosInstance.get(`/my-activities${dataSize}${cursorParam}`);
  return response.data;
};

export default getMyActivity;
