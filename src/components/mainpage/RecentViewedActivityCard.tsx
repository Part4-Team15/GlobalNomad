import { CurrentViewedActivity, getCurrentViewedActivity, getRecentlyViewedActivities, setCurrentViewedActivity, setRecentlyViewedActivities } from '@/utils/saveRecentActivities';
import { Link } from 'react-router-dom';

interface RecentViewedActivityCardProp extends CurrentViewedActivity {};

const RecentViewedActivityCard = ({ id, bannerImageUrl }: RecentViewedActivityCardProp) => {

  const handleClick = () => {
    setCurrentViewedActivity({ id, bannerImageUrl });
    const viewedActivity = getCurrentViewedActivity();

    if (viewedActivity) {
      let viewedList = getRecentlyViewedActivities();

      // 추가하려는 최근 본 체험과 중복된 체험이 목록에 있는지 확인
      viewedList = viewedList.filter((activity: CurrentViewedActivity) => activity.id !== viewedActivity.id);
      viewedList.unshift(viewedActivity);

      if (viewedList.length > 6) {
        viewedList = viewedList.slice(0, 6);
      }

      setRecentlyViewedActivities(viewedList);
    }
  };

  return (
    <Link key={id} to={`/activity/${id}`} onClick={handleClick}>
      <div
        className="w-28 h-28 bg-cover bg-center rounded-3xl
          hover:border hover:border-green-300 hover:shadow-green-700 hover:shadow-custom
          hover:dark:border-gray-20 hover:dark:shadow-darkMode-gray-10"
        style={{ backgroundImage: `url(${bannerImageUrl})` }}
      />
    </Link>
  );
};

export default RecentViewedActivityCard;
