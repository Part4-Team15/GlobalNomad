import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import { useEffect, useState } from 'react';
import { ActivityInfo } from '@/types/mainPage';
import getCurrentPageActivity from '@/api/getCurrentPageActivity';

const OFFSET_LIMIT = 8;

const ActivityCardList = () => {
  const [currenData, setCurrentData] = useState<ActivityInfo[]>([]);
  const [count, setCount] = useState(1);

  // 페이지를 넘길 때마다 해당 페이지의 데이터를 불러오는 함수.
  const handlePageData = async (pageNum: number, size: number) => {
    try {
      const { activities } = await getCurrentPageActivity(pageNum, size);
      setCurrentData(activities);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const data = await getCurrentPageActivity(1, OFFSET_LIMIT);
      setCurrentData(data.activities);
      setCount(data.totalCount);
    };
    fetchPageData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-6 mb-[72px]">
        {currenData.map((activity) => (
          <ActivityCard key={activity.id} cardData={activity} />
        ))}
      </div>
      <Pagination totalCount={count} offsetLimit={OFFSET_LIMIT} setActivityList={handlePageData} />
    </>
  );
};

export default ActivityCardList;
