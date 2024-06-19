import { ActivityInfo } from '@/types/mainPage';
import {
  CurrentViewedActivity,
  getCurrentViewedActivity,
  getRecentlyViewedActivities,
  setCurrentViewedActivity,
  setRecentlyViewedActivities
} from '@/utils/saveRecentActivities';
import { Link } from 'react-router-dom';

interface PopularActivityCardProps {
  cardData: ActivityInfo;
}

const PopularActivityCard = ({
  cardData: { id, title, price, bannerImageUrl, rating, reviewCount }
}: PopularActivityCardProps) => {

  const handleClick = () => {
    setCurrentViewedActivity({ id, title, price, bannerImageUrl, rating, reviewCount });
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
    <Link to={`/activity/${id}`} onClick={handleClick}>
      <div className="relative">
        <div className="relative w-96 h-96 bg-cover bg-center bg-no-repeat rounded-3xl hover:bg-extend lg:w-[317px] lg:h-[317px] sm:w-[186px] sm:h-[186px]" style={{ backgroundImage: `url('${bannerImageUrl}')` }}>
          <div className="absolute inset-0 bg-black opacity-30 rounded-3xl" />
        </div>
        <div className="absolute bottom-8 left-5 flex flex-col gap-5 w-[230px] text-white sm:bottom-6 sm:w-[146px] sm:gap-[6px]">
          <div className="flex gap-1">
            <img src="/assets/bold_star.svg" alt="little-star" />
            <p className="text-sm font-bold">{`${rating} (${reviewCount})`}</p>
          </div>
          <div className="text-3xl font-bold sm:text-lg">{title}</div>
          <div className="flex items-center gap-1 text-xl font-bold sm:text-base">
            {`₩ ${price}`}
            <span className="text-sm">/인</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PopularActivityCard;
