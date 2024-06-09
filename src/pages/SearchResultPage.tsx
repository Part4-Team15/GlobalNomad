import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import getSearchResult from '@/api/getSearchResult';
import ActivityCard from '@/components/mainpage/ActivityCard';
import ActivitySearch from '@/components/mainpage/ActivitySearch';
import MainBanner from '@/components/mainpage/MainBanner';
import Pagination from '@/components/mainpage/Pagination';

const OFFSET_LIMIT = 16;

const INITIAL_VALUE = {
  activities: [],
  totalCount: 0,
};

const useSearchResult = (keyword: string, pageNum: number, size: number) => {
  return useQuery({
    queryKey: ['pageActivity', keyword, pageNum, size],
    queryFn: () => getSearchResult(keyword, pageNum, size),
    placeholderData: keepPreviousData,
  });
};

const SearchResultPage = () => {
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { data = INITIAL_VALUE } = useSearchResult(
    String(keyword),
    currentPageNum,
    OFFSET_LIMIT,
  );

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
  };

  const handlePageGroupChange = (pageGroup: number) => {
    setCurrentPageGroup(pageGroup);
  };

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
            <div>총 {data.totalCount}개의 결과</div>
          </div>
          {data.totalCount ? (
            <>
              <div className="grid grid-cols-4grid grid-cols-4 gap-6 mb-[72px]">
                {data.activities.map((activity) => (
                  <ActivityCard key={activity.id} cardData={activity} />
                ))}
              </div>
              <Pagination
                currentPage={currentPageNum}
                currentPageGroup={currentPageGroup}
                totalCount={data.totalCount}
                offsetLimit={OFFSET_LIMIT}
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
