import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ActivityInfo } from '@/types/mainPage';
import getSearchResult from '@/api/getSearchResult';
import ActivityCard from '@/components/mainpage/ActivityCard';
import ActivitySearch from '@/components/mainpage/ActivitySearch';
import MainBanner from '@/components/mainpage/MainBanner';
import Pagination from '@/components/mainpage/Pagination';

const OFFSET_LIMIT = 16;

const SearchResultPage = () => {
  const [currenData, setCurrentData] = useState<ActivityInfo[]>([]);
  const [count, setCount] = useState(1);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const handlePageActivity = async (pageNum: number, size: number) => {
    const { activities } = await getSearchResult(keyword as string, pageNum, size);
    setCurrentData(activities);
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const data = await getSearchResult(keyword as string, 0, OFFSET_LIMIT);
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
          <div className="flex flex-col gap-3 text-nomad-black mt-10 mb-[60px]">
            <div className="text-[2rem]">
              <span className="font-bold">{keyword}</span>
              으로 검색한 결과입니다.
            </div>
            <div>총 {count}개의 결과</div>
          </div>
          {count ? (
            <>
              <div className="grid grid-cols-4grid grid-cols-4 gap-6 mb-[72px]">
                {currenData.map((activity) => (
                  <ActivityCard key={activity.id} cardData={activity} />
                ))}
              </div>
              <Pagination
                totalCount={count}
                offsetLimit={OFFSET_LIMIT}
                setActivityList={handlePageActivity}
              />
            </>
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
