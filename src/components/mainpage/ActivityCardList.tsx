import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { ActivityInfo, ActivityResponse } from '@/types/mainPage';
import getCurrentPageActivity from '@/api/getCurrentPageActivity';

const OFFSET_LIMIT = 8;

const ActivityCardList = () => {
  const [currenData, setCurrentData] = useState<ActivityInfo[]>([]);
  const [count, setCount] = useState(1);

  // 처음으로 렌더링 시 1페이지 데이터를 불러오는 함수.
  async function getFirstPageActivity() {
    const res = await axiosInstance.get<ActivityResponse>(
      `/activities?method=offset&page=1&size=${OFFSET_LIMIT}`
    );
    return res.data;
  }

  // 페이지를 넘길 때마다 해당 페이지의 데이터를 불러오는 함수.
  const getPageData = async (pageNum: number, size: number) => {
    try {
      const { activities } = await getCurrentPageActivity(pageNum, size);
      setCurrentData(activities);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const data = await getFirstPageActivity();
      setCurrentData(data.activities);
      setCount(data.totalCount);
    };
    fetchPageData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-6 mb-[72px]">
        {currenData?.map((activity) => (
          <ActivityCard key={activity.id} cardData={activity} />
        ))}
      </div>
      <Pagination totalCount={count} offsetLimit={OFFSET_LIMIT} setActivityList={getPageData} />
    </>
  );
};

export default ActivityCardList;
