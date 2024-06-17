import axiosInstance from '@/lib/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';
import { NotificationDataType } from '@/types/notification';

const getMyNotification = async ({ queryKey, pageParam }: QueryFunctionContext) => {
  const [, size] = queryKey;
  const cursorParam = pageParam ? `&cursorId=${pageParam}` : '';
  const dataSize = size ? `?size=${size}` : '';
  const response = await axiosInstance.get<NotificationDataType>(
    `/my-notifications${dataSize}${cursorParam}`,
  );
  return response.data;
};

export default getMyNotification;
