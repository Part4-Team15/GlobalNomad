import { EXAMPLE_ACTIVITY } from '@/lib/utils/activity_mock_data';
import PopularActivityCard from './PopularActivityCard';

const PopularActivityList = () => {
  const { activities } = EXAMPLE_ACTIVITY;

  return (
    <>
      <div className="flex justify-between">
        <div className="text-4xl font-bold mb-[33px]">🔥인기 체험</div>
        <div>
          <button type="button">left</button>
          <button type="button">right</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 w-pc">
        {activities.map((activity) => (
          <PopularActivityCard cardData={activity} />
        ))}
      </div>
    </>
  );
};

export default PopularActivityList;
