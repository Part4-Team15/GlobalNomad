import axiosInstance from '@/lib/axiosInstance';
import { ActivityResponse } from '@/types/mainPage';

const defaultActivityResponse: ActivityResponse = {
  activities: [],
  totalCount: 0,
};

const getCurrentPageActivity = async (pageNum: number, size: number): Promise<ActivityResponse> => {
  try {
    const res = await axiosInstance.get<ActivityResponse>(
      `/activities?method=offset&page=${pageNum + 1}&size=${size}`
    );
    return res.data;
  } catch (e) {
    console.error('Error: ', e);
    return defaultActivityResponse;
  }
};

export default getCurrentPageActivity;
