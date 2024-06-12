import axiosInstance from '@/lib/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';

const getMyReservation = async ({ queryKey, pageParam }: QueryFunctionContext): Promise<any> => {
  const [, size, status] = queryKey;
  const cursorParam = pageParam ? `&cursorId=${pageParam}` : '';
  const dataSize = size ? `?size=${size}` : '';
  const response = await axiosInstance.get(
    `/my-reservations${dataSize}${status ? `&status=${status}` : ''}${cursorParam}`,
  );
  return response.data;
};

export default getMyReservation;
