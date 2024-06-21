import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import getPopularActivity from '@/api/getPopularActivity';
import useWindowWidth from '@/hooks/useWindowWidth';
import PopularActivityCard from './PopularActivityCard';
import PopularActivityButton from './PopularActivityButton';
import PopularCardSkeleton from '../skeletonUI/mainpage/PopularCardSkeleton';

const OFFSET = 3;

const PopularActivityList = () => {
  const [startIdx, setStartIdx] = useState(0);
  const windowWidth = useWindowWidth();
  const isPCSize = windowWidth >= 1024;

  const {
    data: popularActivityList,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.popularActivity(),
    queryFn: getPopularActivity,
    staleTime: 5 * 60 * 1000,
  });

  if (isError || !popularActivityList) {
    return <div>{error?.message}</div>;
  }

  const { activities, totalCount } = popularActivityList;

  const pageActivityList = activities.slice(startIdx, startIdx + 3);
  const activityList = isPCSize ? pageActivityList : activities;

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
        <h2 className="text-4xl font-bold mb-8 sm:text-lg sm:mb-6 dark:text-darkMode-white-10">🔥인기 체험</h2>
        {isPCSize && <PopularActivityButton
          idx={startIdx}
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
        />}
      </div>
      {totalCount ? (
        <div className="flex gap-6 w-full overflow-x-scroll hide-scrollbar lg:w-[1000px] md:gap-8 md:w-tab sm:gap-4 sm:w-mob">
          {isFetching
            ? Array.from({ length: OFFSET }, (_, index) => <PopularCardSkeleton key={index} />)
            : activityList.map((activity) => (
                <PopularActivityCard key={activity.id} cardData={activity} />
              ))}
        </div>
        ) : (
          <div className="flex justify-center items-center h-[918px] text-xl md:h-[1183px] sm:h-[614px]">
            인기 체험 내역이 없습니다.
          </div>
        )
      }
    </div>
  );
};

export default PopularActivityList;
