import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import { EXAMPLE_ACTIVITY } from '@/lib/utils/activity_mock_data';

const ActivityCardList = () => {
  const { activities, totalCount } = EXAMPLE_ACTIVITY;
  const count = Math.ceil(totalCount / 8);
  return (
    <div className="grid grid-cols-4 gap-6 w-pc">
      {activities.map((activity) => (
        <ActivityCard cardData={activity} />
      ))}
      <Pagination totalCount={count} />
    </div>
  );
};

export default ActivityCardList;
