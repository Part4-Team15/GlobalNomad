import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import getPopularActivity from '@/api/getPopularActivity';
import PopularActivityCard from './PopularActivityCard';
import PopularActivityButton from './PopularActivityButton';
import PopularCardSkeleton from '../skeletonUI/mainpage/PopularCardSkeleton';

const OFFSET = 3;

const PopularActivityList = () => {
  const [startIdx, setStartIdx] = useState(0);

  const {
    data: popularActivityList,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.popularActivity(),
    queryFn: getPopularActivity,
  });

  if (isError || !popularActivityList) {
    return <div>{error?.message}</div>;
  }

  const pageActivityList = popularActivityList.activities.slice(startIdx, startIdx + 3);

  const handleLeftClick = () => {
    if (startIdx === 0) return;
    setStartIdx(startIdx - 1);
  };

  const handleRightClick = () => {
    if (pageActivityList.length < 3) return;
    setStartIdx(startIdx + 1);
  };

  return (
    <div className="mt-10 mb-[60px] sm:mt-6 sm:mb-10">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold mb-8 sm:text-lg sm:mb-6">🔥인기 체험</h2>
        <PopularActivityButton
          idx={startIdx}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
        />
      </div>
      <div className="flex gap-6 w-pc overflow-x-scroll hide-scrollbar lg:w-[1000px] md:gap-8 md:w-tab sm:gap-4 sm:w-mob">
        {isFetching
          ? Array.from({ length: OFFSET }, (_, index) => <PopularCardSkeleton key={index} />)
          : pageActivityList.map((activity) => (
              <PopularActivityCard key={activity.id} cardData={activity} />
            ))}
      </div>
    </div>
  );
};

export default PopularActivityList;
