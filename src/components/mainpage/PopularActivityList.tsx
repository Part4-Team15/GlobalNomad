import { useState } from 'react';
import { EXAMPLE_ACTIVITY } from '@/lib/utils/activity_mock_data';
import PopularActivityCard from './PopularActivityCard';
import PopularActivityButton from './PopularActivityButton';

const PopularActivityList = () => {
  const [startIdx, setStartIdx] = useState(0);
  const { activities } = EXAMPLE_ACTIVITY;

  const pageActivityList = activities.slice(startIdx, startIdx + 3);

  const handleLeftClick = () => {
    if (startIdx === 0) return;
    setStartIdx(startIdx - 1);
  };
  const handleRightClick = () => {
    if (pageActivityList.length < 3) return;
    setStartIdx(startIdx + 1);
  };

  return (
    <div className="mt-10 mb-[60px]">
      <div className="flex justify-between">
        <div className="text-4xl font-bold mb-[33px]">🔥인기 체험</div>
        <PopularActivityButton onLeftClick={handleLeftClick} onRightClick={handleRightClick} />
      </div>
      <div className="grid grid-cols-3 gap-6 w-pc">
        {pageActivityList.map((activity) => (
          <PopularActivityCard key={activity.id} cardData={activity} />
        ))}
      </div>
    </div>
  );
};

export default PopularActivityList;
