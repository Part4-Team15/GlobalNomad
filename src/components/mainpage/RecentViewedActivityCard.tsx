import { CurrentViewedActivity } from '@/utils/saveRecentActivities';
import { Link } from 'react-router-dom';

interface RecentViewedActivityCardProp extends CurrentViewedActivity {};

const RecentViewedActivityCard = ({ id, bannerImageUrl }: RecentViewedActivityCardProp) => {
  return (
    <Link key={id} to={`/activity/${id}`}>
      <div
        className="w-28 h-28 bg-cover bg-center rounded-3xl
          hover:border hover:border-green-300 hover:shadow-green-700 hover:shadow-custom"
        style={{ backgroundImage: `url(${bannerImageUrl})` }}
      />
    </Link>
  );
};

export default RecentViewedActivityCard;
