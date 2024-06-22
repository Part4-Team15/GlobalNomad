import axiosInstance from "@/lib/axiosInstance";
import { ActivityResponse } from "@/types/mainPage";

const DEFAULT_ACTIVITY_RESPONSE: ActivityResponse = {
  activities: [],
  totalCount: 0,
};

const urlSearchParams = new URLSearchParams({
  method: 'offset',
  sort: 'most_reviewed',
  page: String(1),
  size: String(10),
});

// 인기 체험 리스트 데이터를 불러오는 함수.
async function getPopularActivity() {
  try {
    const res = await axiosInstance.get<ActivityResponse>(
      `/activities?${urlSearchParams}`
    );
    return res.data;
  } catch (e) {
    console.error('Error: ', e);
    return DEFAULT_ACTIVITY_RESPONSE;
  }
}

export default getPopularActivity;
