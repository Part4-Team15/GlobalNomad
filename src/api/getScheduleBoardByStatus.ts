import axiosInstance from '@/lib/axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';

const getScheduleBoardByStatus = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext): Promise<any> => {
  const [, activityId, scheduleId, status] = queryKey;
  try {
    const cursorParam = pageParam ? `cursorId=${pageParam}&` : '';

    const response = await axiosInstance.get(
      `/my-activities/${activityId}/reservations?${cursorParam}size=3&scheduleId=${scheduleId}&status=${status}`,
    );
    if (response.status !== 200) {
      throw new Error('update Error');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching My activity data:', error);
    throw error;
  }
};

export default getScheduleBoardByStatus;
