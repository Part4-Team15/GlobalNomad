import axiosInstance from '@/lib/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';

const getReservationSchedule = async ({ queryKey }: QueryFunctionContext): Promise<any> => {
  const [, activityId, selectedDate] = queryKey;
  try {
    const response = await axiosInstance.get(
      `/my-activities/${activityId}/reserved-schedule?date=${selectedDate}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching My activity data:', error);
    throw error;
  }
};

export default getReservationSchedule;
