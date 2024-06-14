import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getSearchResult from '@/api/getSearchResult';
import ActivityCard from '@/components/mainpage/ActivityCard';
import Pagination from '@/components/mainpage/Pagination';
import ActivityCardSkeleton from '../skeletonUI/mainpage/ActivityCardSkeleton';

function calculateOffsetLimit() {
  if (window.innerWidth > 1024) {
    return 16;
  }
  if (window.innerWidth > 769) {
    return 9;
  }
  return 8;
}

const useSearchResult = (keyword: string, pageNum: number, size: number) => {
  return useQuery({
    queryKey: ['pageActivity', keyword, pageNum, size],
    queryFn: () => getSearchResult(keyword, pageNum, size),
    placeholderData: keepPreviousData,
  });
};

const SearchResultList = () => {
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const [offset, setOffset] = useState(calculateOffsetLimit());
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    const handleResize = () => {
      setOffset(calculateOffsetLimit());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { data: searchResult, isFetching, isError, error } = useSearchResult(
    String(keyword),
    currentPageNum,
    offset,
  );

  if (isError || !searchResult) {
    return <div>{error?.message}</div>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
  };

  const handlePageGroupChange = (pageGroup: number) => {
    setCurrentPageGroup(pageGroup);
  };

  const { activities, totalCount } = searchResult;
  return (
    <>
      <div className="flex flex-col gap-3 text-nomad-black mt-10 mb-6 md:my-6 sm:mt-6 sm:mb-4">
        <h2 className="text-[2rem] sm:text-2xl sm:leading-normal">
          <span className="font-bold text-green-40">{keyword}</span>
          으로 검색한 결과입니다.
        </h2>
        <p className="sm:leading-[26px]">총 {totalCount}개의 결과</p>
      </div>
      {totalCount ? (
        <>
          <div className="grid grid-cols-4 gap-x-6 gap-y-12 mb-[72px]
            md:grid-cols-3 md:gap-x-4 md:gap-y-8 md:mb-36 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-6 sm:mb-28"
          >
            {isFetching ? (
              Array.from({ length: offset }, (_, index) => (
                <ActivityCardSkeleton key={index} />
              ))
            ) : (
              activities.map((activity) => (
                <ActivityCard key={activity.id} cardData={activity} />
              ))
            )}
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
        <div className="flex justify-center items-center">검색 결과가 없습니다.</div>
      )}
    </>
  );
};

export default SearchResultList;
