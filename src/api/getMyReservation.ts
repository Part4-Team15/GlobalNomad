import axiosInstance from '@/lib/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';

const getMyReservation = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [, status] = queryKey;
  const response = await axiosInstance.get(
    `/my-reservations?size=10${status ? `&status=${status}` : ''}`,
  );
  return response.data;
};

export default getMyReservation;
