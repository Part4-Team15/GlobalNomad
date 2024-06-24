import { ActivityInfo } from '@/types/mainPage';
import {
  CurrentViewedActivity,
  getCurrentViewedActivity,
  getRecentlyViewedActivities,
  setCurrentViewedActivity,
  setRecentlyViewedActivities
} from '@/utils/saveRecentActivities';
import { Link } from 'react-router-dom';
import priceToWon from '@/utils/priceToWon';

interface ActivityCardProps {
  cardData: ActivityInfo;
}

const ActivityCard = ({
  cardData: { id, title, price, bannerImageUrl, rating, reviewCount }
}: ActivityCardProps) => {

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
    <Link
      to={`/activity/${id}`}
      className="group h-[435px] md:h-[374px] sm:h-[295px]"
      onClick={handleClick}
    >
      <div className="flex flex-col gap-4">
        <div
          className="w-[278px] h-[278px] bg-green-10 bg-cover bg-center rounded-3xl group-hover:bg-extend lg:w-[232px] lg:h-[232px] md:w-[221px] md:h-[221px] sm:w-[168px] sm:h-[168px]"
          style={{ backgroundImage: `url(${bannerImageUrl})` }}
        />
        <div className="flex flex-col gap-[10px] w-[278px] text-black leading-none px-2 py-2 rounded-2xl
        group-hover:bg-green-5 group-hover:text-green-80 dark:text-darkMode-white-10 lg:w-[232px] md:w-[221px] sm:w-[168px]">
          <div className="flex items-center gap-1">
            <img src="/assets/bold_star.svg" alt="little-star" />
            <p className="font-medium group-hover:text-green-20 sm:text-sm">
              {rating}
              <span className="text-gray-60 group-hover:text-green-80">{` (${reviewCount})`}</span>
            </p>
          </div>
          <div className="text-2xl font-semibold mb-[5px] line-clamp-2 sm:text-lg sm:leading-tight">{title}</div>
          <div className="flex items-center gap-1 text-[28px] font-bold group-hover:text-green-20 sm:text-xl sm:leading-none">
            {priceToWon(price)}
            <span className="text-xl text-gray-80 font-normal group-hover:text-green-80 dark:text-darkMode-gray-10 sm:text-base">/인</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;
