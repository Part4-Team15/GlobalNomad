import axiosInstance from '@/lib/axiosInstance';
import { ActivityResponse } from '@/types/mainPage';

const defaultActivityResponse: ActivityResponse = {
  activities: [],
  totalCount: 0,
};

const getSearchResult = async (
  keyword: string,
  pageNum: number,
  size: number,
): Promise<ActivityResponse> => {
  const urlSearchParams = new URLSearchParams({
    method: 'offset',
    keyword,
    page: String(pageNum + 1),
    size: String(size),
  });

  try {
    const res = await axiosInstance.get<ActivityResponse>(
      `/activities?${urlSearchParams}`
    );
    return res.data;
  } catch (e) {
    console.error('Error: ', e);
    return defaultActivityResponse;
  }
};

export default getSearchResult;
