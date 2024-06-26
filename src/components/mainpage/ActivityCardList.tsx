import { MouseEvent, useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ALL_ACTIVITY_OFFSET_LIST } from '@/constants/pagination_config';
import queryKeys from '@/api/reactQuery/queryKeys';
import calculateOffsetLimit from '@/utils/calculateOffsetLimit';
import calculatePageGroupNumber from '@/utils/calculatePageGroupNumber';
import getCurrentPageActivity from '@/api/getCurrentPageActivity';
import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import CategoryFilter from './CategoryFilter';
import ActivityCardSkeleton from '../skeletonUI/mainpage/ActivityCardSkeleton';

const usePageActivity = (pageNum: number, size: number, category: string, sort: string) => {
  return useQuery({
    queryKey: queryKeys.currentPageActivity(pageNum, size, category, sort),
    queryFn: () => getCurrentPageActivity(pageNum, size, category, sort),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

const ActivityCardList = () => {
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentSort, setCurrentSort] = useState('');
  const [offset, setOffset] = useState(calculateOffsetLimit(...ALL_ACTIVITY_OFFSET_LIST));
  const currentPageGroup = calculatePageGroupNumber(currentPageNum);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get('page');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setOffset(calculateOffsetLimit(8, 9, 4));
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
    if (sortParam) setCurrentSort(sortParam);
    if (pageParams) setCurrentPageNum(Number(pageParams) - 1);
  }, []);

  useEffect(() => {
    if (currentCategory) searchParams.set('category', currentCategory);
    if (currentSort) searchParams.set('sort', currentSort);
    searchParams.set('page', String(currentPageNum + 1));

    navigate(`?${searchParams}`);
  }, [currentCategory, currentSort, currentPageNum, setSearchParams, navigate]);

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
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
  };

  const handleSortClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setCurrentSort(button.value);
    searchParams.set('sort', button.value);
    setCurrentPageNum(0);
  };

  const {
    data: allActivityList,
    isFetching,
    isError,
    error,
  } = usePageActivity(currentPageNum, offset, currentCategory, currentSort);

  if (isError) {
    return <div>{error?.message}</div>;
  }

  const activities = allActivityList?.activities || [];;
  const totalCount = allActivityList?.totalCount || 0;

  return (
    <>
      <CategoryFilter
        currentCategory={currentCategory}
        onSelectCategory={handleCategoryClick}
        onSetSort={handleSortClick}
      />
      <h2 className="text-4xl font-bold mt-10 mb-8 dark:text-darkMode-white-10 sm:text-lg sm:my-6 sm:leading-none">
        {currentCategory || '🛼 모든 체험'}
      </h2>
      <div
        className="grid grid-cols-4 gap-x-6 gap-y-12 w-full h-[918px] mb-[72px]
        md:grid-cols-3 md:gap-x-4 md:gap-y-8 md:h-[1184px] sm:grid-cols-2 sm:gap-x-2 sm:gap-y-6 sm:h-[638px] sm:mb-[62px]"
      >
        {isFetching
          ? Array.from({ length: offset }, (_, index) => <ActivityCardSkeleton key={index} />)
          : activities.map((activity) => (
              <ActivityCard key={activity.id} cardData={activity} />
            ))}
        {totalCount === 0 && !isFetching &&
          <div
            className="col-span-4 flex justify-around items-center text-2xl font-medium
            dark:text-darkMode-white-10 md:col-span-3 sm:col-span-2 sm:text-base"
          >
            신청할 수 있는 체험이 없습니다.
          </div>
        }
      </div>
      {totalCount !== 0 &&
        <Pagination
          currentPage={currentPageNum}
          currentPageGroup={currentPageGroup}
          totalCount={totalCount}
          offsetLimit={offset}
          setPageNum={handlePageChange}
        />
      }
    </>
  );
};

export default ActivityCardList;
