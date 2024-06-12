import { MouseEvent, useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

const usePageActivity = (pageNum: number, size: number, category: string, sort:string) => {
  return useQuery({
    queryKey: ['pageActivity', pageNum, size, category, sort],
    queryFn: () => getCurrentPageActivity(pageNum, size, category, sort),
    placeholderData: keepPreviousData,
  });
};

const ActivityCardList = () => {
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const [sortActivity, setSortActivity] = useState('');
  const [offset, setOffset] = useState(calculateOffsetLimit());
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get('page');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setOffset(calculateOffsetLimit());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort');

    if (categoryParam) setCurrentCategory(categoryParam);
    if (sortParam) setSortActivity(sortParam);
    if (pageParams) setCurrentPageNum(Number(pageParams) - 1);
    if (Number(pageParams) > 5) setCurrentPageGroup(Math.floor(Number(pageParams) / 5));
  }, []);

  useEffect(() => {
    if (currentCategory) searchParams.set('category', currentCategory);
    if (sortActivity) searchParams.set('sort', sortActivity);
    else searchParams.set('page', String(currentPageNum + 1));

    navigate(`?${searchParams}`);
  }, [currentCategory, sortActivity, currentPageNum, setSearchParams, navigate]);

  useEffect(() => {
    const handlePageShow = () => {
      if (currentCategory) searchParams.delete('category');
      if (sortActivity) searchParams.delete('sort');
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  const { data: allActivityList, isLoading, isError } = usePageActivity(
    currentPageNum,
    offset,
    currentCategory,
    sortActivity
  );

  if (isLoading) {
    return <div>모든 체험 정보를 불러오고 있습니다</div>;
  }

  if (isError || !allActivityList) {
    return <div>모든 체험 정보를 불러오는 중 오류가 발생했습니다</div>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
  };

  const handlePageGroupChange = (page: number) => {
    setCurrentPageGroup(page);
  };

  const handleCategoryClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    if (currentCategory === button.value) {
      setCurrentCategory('');
      searchParams.delete('category');
    } else {
      setCurrentCategory(button.value);
      searchParams.set('category', button.value);
    }
    setCurrentPageNum(0);
    setCurrentPageGroup(0);
  };

  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setSortActivity(button.value);
    searchParams.set('sort', button.value);
    setCurrentPageNum(0);
    setCurrentPageGroup(0);
  };

  const { activities, totalCount } = allActivityList;

  return totalCount ? (
    <>
      <CategoryFilter
        currentCategory={currentCategory}
        onSelectCategory={handleCategoryClick}
        onSetSort={handleSortClick}
      />
      <div className="text-4xl font-bold mt-10 mb-8 sm:text-lg sm:my-6">
        {currentCategory || '🛼 모든 체험'}
      </div>
      <div className="grid grid-cols-4 gap-6 h-[890px] mb-[72px] md:grid-cols-3 md:gap-4 md:h-[1154px] sm:grid-cols-2 sm:gap-2 sm:h-[572px] sm:mb-[62px]">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} cardData={activity} />
        ))}
      </div>
      <Pagination
        currentPage={currentPageNum}
        currentPageGroup={currentPageGroup}
        totalCount={totalCount}
        offsetLimit={offset}
        setPageNum={handlePageChange}
        setPageGroup={handlePageGroupChange}
      />
    </>
  ) : (
    <div className="flex justify-center items-center">데이터가 없습니다.</div>
  );
};

export default ActivityCardList;
