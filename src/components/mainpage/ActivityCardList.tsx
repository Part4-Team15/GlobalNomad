import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import { ActivityResponse } from '@/lib/utils/activity_mock_data';
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';

const OFFSET_LIMIT = 8;

// 우선 임의로 any 타입 지정. 후에 수정이 필요함.

const ActivityCardList = () => {
  const [currenData, setCurrentData] = useState<any[]>([]);
  const [count, setCount] = useState(1);

  // const pageDataList: any[] = [];
  // for (let i = 0; i < totalCount; i += 8) {
  //   pageDataList.push(activities.slice(i, i + 8));
  // }

  // const handlePageData = (pageNum: number) => {
  //   setCurrentData(pageDataList[pageNum]);
  // };

  async function getActivityData() {
    const res = await axiosInstance.get<ActivityResponse>(
      `/activities?method=offset&page=1&size=${OFFSET_LIMIT}`
    );
    return res.data;
  }

  // api 함수 연결했을 때 예시
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

  // api 연결 이후에 맞춰서 다시 변경 예정
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
