import axiosInstance from '@/lib/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';

const getMyReservation = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext): Promise<any> => {
  const [, status] = queryKey;
  const cursorParam = pageParam ? `&cursorId=${pageParam}` : '';
  const response = await axiosInstance.get(
    `/my-reservations?size=4${status ? `&status=${status}` : ''}${cursorParam}`,
  );
  return response.data;
};

export default getMyReservation;
