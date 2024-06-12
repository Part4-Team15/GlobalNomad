import axiosInstance from '@/lib/axiosInstance';
import { ActivityType } from '@/types/activityPage';

const getActivity = async (id: string): Promise<ActivityType> => {
  try {
    const response = await axiosInstance.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity data:', error);
    throw error;
  }
};

export default getActivity;
