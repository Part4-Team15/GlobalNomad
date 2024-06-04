import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import { MouseEvent, useEffect, useState } from 'react';
import { ActivityInfo } from '@/types/mainPage';
import getCurrentPageActivity from '@/api/getCurrentPageActivity';
import CategoryFilter from './CategoryFilter';

const OFFSET_LIMIT = 8;

const ActivityCardList = () => {
  const [currenData, setCurrentData] = useState<ActivityInfo[]>([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [sortActivity, setSortActivity] = useState('');
  const [count, setCount] = useState(1);

  // 페이지를 넘길 때마다 해당 페이지의 데이터를 불러오는 함수.
  const handlePageData = async (pageNum: number, size: number) => {
    try {
      const { activities } = await getCurrentPageActivity(
        pageNum, size, currentCategory, sortActivity);
      setCurrentData(activities);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const handleCategoryClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    if (currentCategory === button.value) return setCurrentCategory('');
    return setCurrentCategory(button.value);
  };

  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setSortActivity(button.value);
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const data = await getCurrentPageActivity(0, OFFSET_LIMIT, currentCategory, sortActivity);
      setCurrentData(data.activities);
      setCount(data.totalCount);
    };
    fetchPageData();
  }, [currentCategory, sortActivity]);

  return count ? (
    <>
      <CategoryFilter
        currentCategory={currentCategory}
        onSelectCategory={handleCategoryClick}
        onSetSort={handleSortClick}
      />
      <div className="text-4xl font-bold mt-10 mb-8 sm:text-lg sm:my-6">🛼 모든 체험</div>
      <div className="grid grid-cols-4 gap-6 h-[890px] mb-[72px] md:grid-cols-3 md:gap-4 md:h-[1154px] sm:grid-cols-2 sm:gap-2 sm:h-[572px] sm:mb-[62px]">
        {currenData.map((activity) => (
          <ActivityCard key={activity.id} cardData={activity} />
        ))}
      </div>
      <Pagination totalCount={count} offsetLimit={OFFSET_LIMIT} setActivityList={handlePageData} />
    </>
  ) : (
    <div className="flex justify-center items-center">데이터가 없습니다.</div>
  );
};

export default ActivityCardList;
