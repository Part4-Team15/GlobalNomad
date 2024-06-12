import axiosInstance from '@/lib/axiosInstance';
import { AvailableReservationsType } from '@/types/activityPage';
import { QueryFunctionContext } from '@tanstack/react-query';

const getAllMyReservation = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext): Promise<AvailableReservationsType> => {
  const [, status] = queryKey;
  const cursorParam = pageParam ? `&cursorId=${pageParam}` : '';
  const response = await axiosInstance.get(
    `/my-reservations?${status ? `&status=${status}` : ''}${cursorParam}`,
  );
  return response.data;
};

export default getAllMyReservation;
