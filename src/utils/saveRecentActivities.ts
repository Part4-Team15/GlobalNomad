type CurrentViewedActivity = {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
};

// 현재 본 게시물을 localStorage에 저장하는 함수
export const setCurrentViewedActivity = (activity: CurrentViewedActivity) => {
  localStorage.setItem('currentViewedActivity', JSON.stringify(activity));
};

// Local storage에 최근 본 게시물을 불러오는 함수
export const getCurrentViewedActivity = () => {
  const storedData = localStorage.getItem('currentViewedActivity');
  return storedData ? JSON.parse(storedData) : null;
};

// Local storage에 최근 본 게시물 목록을 저장하는 함수
export const setRecentlyViewedActivities = (activity: CurrentViewedActivity) => {
  localStorage.setItem('recentlyViewedActivities', JSON.stringify(activity));
};


// Local storage에서 최근 본 게시물 목록을 가져오는 함수
export const getRecentlyViewedActivities = () => {
  const storedData = localStorage.getItem('recentlyViewedActivities');
  return storedData ? JSON.parse(storedData) : [];
};