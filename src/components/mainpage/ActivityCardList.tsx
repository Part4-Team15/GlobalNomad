import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import { EXAMPLE_MORE_ACTIVITIES } from '@/lib/utils/activity_mock_data';
import { useEffect, useState } from 'react';

const OFFSET_LIMIT = 8;

// 우선 임의로 any 타입 지정. 후에 수정이 필요함.

const ActivityCardList = () => {
  const [currenData, setCurrentData] = useState<any[]>();
  const { activities, totalCount } = EXAMPLE_MORE_ACTIVITIES;

  const pageDataList: any[] = [];
  for (let i = 0; i < totalCount; i += 8) {
    pageDataList.push(activities.slice(i, i + 8));
  }

  const handlePageData = (pageNum: number) => {
    setCurrentData(pageDataList[pageNum]);
  };

  // api 함수 연결했을 때 예시
  // const handlePageData = (pageNum: number, size: number) => {
  //   const { activities } = axios.get(
  //   `/activities?method=offset&page=${pageNum}&size=${OFFSET_LIMIT}`
  // );
  //   setApplyData(res);
  // };

  // api 연결 이후에 맞춰서 다시 변경 예정
  useEffect(() => {
    const fetchPageData = async () => {
      setCurrentData(pageDataList[0]);
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
      <Pagination totalCount={totalCount} limit={OFFSET_LIMIT} setActivityList={handlePageData} />
    </>
  );
};

export default ActivityCardList;
