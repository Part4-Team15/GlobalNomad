import axiosInstance from '@/lib/axiosInstance';
import { ActivityReviewsType } from '@/types/activityPage';
import { OFFSET_LIMIT } from '@/constants/pagination_config';

const getFirstPageReviews = async (activityId: number) => {
  const res = await axiosInstance.get<ActivityReviewsType>(
    `/activities/${activityId}/reviews?page=1&size=${OFFSET_LIMIT}`,
  );
  return res.data;
};

export default getFirstPageReviews;
