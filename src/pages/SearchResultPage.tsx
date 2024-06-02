import getSearchResult from '@/api/getSearchResult';
import ActivityCard from '@/components/mainpage/ActivityCard';
import ActivitySearch from '@/components/mainpage/ActivitySearch';
import MainBanner from '@/components/mainpage/MainBanner';
import Pagination from '@/components/mainpage/Pagination';
import { ActivityInfo } from '@/types/mainPage';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const OFFSET_LIMIT = 16;

const SearchResultPage = () => {
  const [currenData, setCurrentData] = useState<ActivityInfo[]>([]);
  const [count, setCount] = useState(1);
  const [searchParams] = useSearchParams();

  const handlePageActivity = async (pageNum: number, size: number) => {
    const searchQuery = searchParams.get('keyword');
    const { activities } = await getSearchResult(searchQuery as string, pageNum, size);
    setCurrentData(activities);
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const searchQuery = searchParams.get('keyword');
      const data = await getSearchResult(searchQuery as string, 0, OFFSET_LIMIT);
      setCurrentData(data.activities);
      setCount(data.totalCount);
    };
    fetchPageData();
  }, [searchParams]);

  return (
    <div>
      <MainBanner />
      <div className="flex flex-col items-center">
        <div className="w-pc mb-32">
          <ActivitySearch />
          <div className="grid grid-cols-4grid grid-cols-4 gap-6 mb-[72px]">
            {currenData.map((activity) => (
              <ActivityCard cardData={activity} />
            ))}
          </div>
          <Pagination
            totalCount={count}
            offsetLimit={OFFSET_LIMIT}
            setActivityList={handlePageActivity}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
