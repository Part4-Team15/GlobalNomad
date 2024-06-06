import axiosInstance from '@/lib/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';

const getReservationYearAndMonth = async ({ queryKey }: QueryFunctionContext): Promise<any> => {
  const [, activityId, year, month] = queryKey;
  try {
    const response = await axiosInstance.get(
      `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching My activity data:', error);
    throw error;
  }
};

export default getReservationYearAndMonth;
