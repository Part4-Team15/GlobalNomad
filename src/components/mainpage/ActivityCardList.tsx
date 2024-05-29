import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import { ActivityInfo, ActivityResponse } from '@/lib/utils/activity_mock_data';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

const OFFSET_LIMIT = 8;

const ActivityCardList = () => {
  const [currenData, setCurrentData] = useState<ActivityInfo[]>([]);
  const [count, setCount] = useState(1);

  // 처음으로 렌더링 시 1페이지 데이터를 불러오는 함수.
  async function getActivityData() {
    const res = await axiosInstance.get<ActivityResponse>(
      `/activities?method=offset&page=1&size=${OFFSET_LIMIT}`
    );
    return res.data;
  }

  // 페이지를 넘길 때마다 해당 페이지의 데이터를 불러오는 함수.
  const handlePageData = async (pageNum: number, size: number) => {
    try {
      const res = await axiosInstance.get<ActivityResponse>(
        `/activities?method=offset&page=${pageNum + 1}&size=${size}`
      );
      const { activities } = res.data;
      setCurrentData(activities);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const data = await getActivityData();
      setCurrentData(data.activities);
      setCount(data.totalCount);
    };
    fetchPageData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-6 mb-[72px]">
        {currenData?.map((activity) => (
          <ActivityCard cardData={activity} />
        ))}
      </div>
      <Pagination totalCount={count} limit={OFFSET_LIMIT} setActivityList={handlePageData} />
    </>
  );
};

export default ActivityCardList;
