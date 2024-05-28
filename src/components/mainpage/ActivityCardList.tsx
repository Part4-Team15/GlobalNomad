import Pagination from '@/components/mainpage/Pagination';
import ActivityCard from '@/components/mainpage/ActivityCard';
import { EXAMPLE_ACTIVITY } from '@/lib/utils/activity_mock_data';

const ActivityCardList = () => {
  const { activities, totalCount } = EXAMPLE_ACTIVITY;
  return (
    <>
      <div className="grid grid-cols-4 gap-6 mb-[72px]">
        {activities.map((activity) => (
          <ActivityCard cardData={activity} />
        ))}
      </div>
      <Pagination totalCount={totalCount} limit={8} />
    </>
  );
};

export default ActivityCardList;
