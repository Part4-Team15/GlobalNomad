import axiosInstance from '@/lib/axiosInstance';
import { ActivityReviewsType } from '@/types/activityPage';

const getActivityReviews = async (id: string): Promise<ActivityReviewsType> => {
  try {
    const response = await axiosInstance.get(`/activities/${id}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews data:', error);
    throw error;
  }
};

export default getActivityReviews;
