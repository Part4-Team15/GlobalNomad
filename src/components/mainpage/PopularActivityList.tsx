import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { ActivityInfo, ActivityResponse } from '@/types/mainPage';
import PopularActivityCard from './PopularActivityCard';
import PopularActivityButton from './PopularActivityButton';

const PopularActivityList = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [activity, setActivity] = useState<ActivityInfo[]>([]);

  // 인기 체험 리스트 데이터를 불러오는 함수.
  async function getPopularActivity() {
    const res = await axiosInstance.get<ActivityResponse>(
      '/activities?method=offset&sort=most_reviewed&page=1&size=10'
    );
    return res.data;
  }

  const pageActivityList = activity.slice(startIdx, startIdx + 3);

  const handleLeftClick = () => {
    if (startIdx === 0) return;
    setStartIdx(startIdx - 1);
  };
  const handleRightClick = () => {
    if (pageActivityList.length < 3) return;
    setStartIdx(startIdx + 1);
  };

  useEffect(() => {
    const fetchActivity = async () => {
      const data = await getPopularActivity();
      setActivity(data.activities);
    };
    fetchActivity();
  }, []);

  return (
    <div className="mt-10 mb-[60px] sm:mt-6 sm:mb-10">
      <div className="flex justify-between">
        <div className="text-4xl font-bold mb-8 sm:text-lg sm:mb-6">🔥인기 체험</div>
        <PopularActivityButton onLeftClick={handleLeftClick} onRightClick={handleRightClick} />
      </div>
      <div className="flex gap-6 w-pc overflow-x-scroll hide-scrollbar md:gap-8 md:w-tab sm:gap-4 sm:w-mob">
        {pageActivityList.map((info) => (
          <PopularActivityCard key={info.id} cardData={info} />
        ))}
      </div>
    </div>
  );
};

export default PopularActivityList;
