import { MouseEvent, useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import getCurrentPageActivity from '@/api/getCurrentPageActivity';
import CategoryFilter from './CategoryFilter';

function calculateOffsetLimit() {
  if (window.innerWidth > 1024) {
    return 8;
  }
  if (window.innerWidth > 769) {
    return 9;
  }
  return 4;
}

const INITIAL_VALUE = {
  activities: [],
  totalCount: 0,
};

const usePageActivity = (pageNum: number, size: number, category: string, sort:string) => {
  return useQuery({
    queryKey: ['pageActivity', pageNum, size, category, sort],
    queryFn: () => getCurrentPageActivity(pageNum, size, category, sort),
    placeholderData: keepPreviousData,
  });
};

const ActivityCardList = () => {
  const [currentCategory, setCurrentCategory] = useState('');
  const [sortActivity, setSortActivity] = useState('');
  const [offset, setOffset] = useState(calculateOffsetLimit());
  const [currentPageNum, setCurrentPageNum] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setOffset(calculateOffsetLimit());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const { data = INITIAL_VALUE } = usePageActivity(
    currentPageNum,
    offset,
    currentCategory,
    sortActivity
  );

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
  };

  const handleCategoryClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    if (currentCategory === button.value) setCurrentCategory('');
    else setCurrentCategory(button.value);
    setCurrentPageNum(0);
  };

  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setSortActivity(button.value);
    setCurrentPageNum(0);
  };

  return data.totalCount ? (
    <>
      <CategoryFilter
        currentCategory={currentCategory}
        onSelectCategory={handleCategoryClick}
        onSetSort={handleSortClick}
      />
      <div className="text-4xl font-bold mt-10 mb-8 sm:text-lg sm:my-6">🛼 모든 체험</div>
      <div className="grid grid-cols-4 gap-6 h-[890px] mb-[72px] md:grid-cols-3 md:gap-4 md:h-[1154px] sm:grid-cols-2 sm:gap-2 sm:h-[572px] sm:mb-[62px]">
        {data.activities.map((activity) => (
          <ActivityCard key={activity.id} cardData={activity} />
        ))}
      </div>
      <Pagination
        currentPage={currentPageNum}
        totalCount={data.totalCount}
        offsetLimit={offset}
        setPageNum={handlePageChange}
      />
    </>
  ) : (
    <div className="flex justify-center items-center">데이터가 없습니다.</div>
  );
};

export default ActivityCardList;
