import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { SEARCH_OFFSET_LIMIT } from '@/constants/pagination_config';
import getSearchResult from '@/api/getSearchResult';
import ActivityCard from '@/components/mainpage/ActivityCard';
import ActivitySearch from '@/components/mainpage/ActivitySearch';
import MainBanner from '@/components/mainpage/MainBanner';
import Pagination from '@/components/mainpage/Pagination';
import queryKeys from '@/api/reactQuery/queryKeys';

const useSearchResult = (keyword: string, pageNum: number, size: number) => {
  return useQuery({
    queryKey: queryKeys.searchPageActivity(keyword, pageNum, size),
    queryFn: () => getSearchResult(keyword, pageNum, size),
    placeholderData: keepPreviousData,
  });
};

const SearchResultPage = () => {
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const {
    data: searchResult,
    isLoading,
    isError,
  } = useSearchResult(String(keyword), currentPageNum, SEARCH_OFFSET_LIMIT);

  if (isLoading) {
    return <div>검색 결과를 불러오고 있습니다</div>;
  }

  if (isError || !searchResult) {
    return <div>검색 결과를 불러오는 중 오류가 발생했습니다</div>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
  };

  const handlePageGroupChange = (pageGroup: number) => {
    setCurrentPageGroup(pageGroup);
  };

  const { activities, totalCount } = searchResult;

  return (
    <div>
      <MainBanner />
      <div className="flex flex-col items-center">
        <div className="w-pc mb-32 md:w-tab sm:w-mob">
          <ActivitySearch />
          <div className="flex flex-col gap-3 text-nomad-black mt-10 mb-[60px]">
            <div className="text-[2rem]">
              <span className="font-bold">{keyword}</span>
              으로 검색한 결과입니다.
            </div>
            <div>총 {totalCount}개의 결과</div>
          </div>
          {totalCount ? (
            <>
              <div className="grid grid-cols-4grid grid-cols-4 gap-6 mb-[72px]">
                {activities.map((activity) => (
                  <ActivityCard key={activity.id} cardData={activity} />
                ))}
              </div>
              <Pagination
                currentPage={currentPageNum}
                currentPageGroup={currentPageGroup}
                totalCount={totalCount}
                offsetLimit={SEARCH_OFFSET_LIMIT}
                setPageNum={handlePageChange}
                setPageGroup={handlePageGroupChange}
              />
            </>
          ) : (
            <div className="flex justify-center items-center">데이터가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
