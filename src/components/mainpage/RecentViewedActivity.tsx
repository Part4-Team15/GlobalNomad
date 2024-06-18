import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CurrentViewedActivity, getRecentlyViewedActivities } from '@/utils/saveRecentActivities';
import '../../styles/customScrollbar.css';

const RecentViewedActivity = () => {
  const [showList, setShowList] = useState(false);
  const [recentViewedList, setRecentViewedList] = useState([]);

  const handleClick = () => {
    setShowList(!showList);
  }

  useEffect(() => {
    const viewedList = getRecentlyViewedActivities();
    setRecentViewedList(viewedList);
  }, []);

  return (
    <>
      <button
        className="fixed top-1/2 -right-[2px]"
        type='button'
        onClick={handleClick}
      >
        <img src='/assets/pagination_arrow_left.svg' alt='show recent activity List'/>
      </button>
      {showList && <div className="fixed top-4 right-4 rounded-2xl bg-white border border-green-80 p-4 z-10">
        <p className="text-lg text-center font-medium pb-2">최근 방문한 체험</p>
        <div
          className="w-36 h-48 flex flex-col items-center gap-3 overflow-y-scroll custom-scrollbar"
        >
          {recentViewedList.length ?
            (recentViewedList.map((activity: CurrentViewedActivity) => (
              <Link key={activity.id} to={`/activity/${activity.id}`}>
                <div
                  className="w-24 h-24 bg-cover bg-center rounded-3xl"
                  style={{ backgroundImage: `url(${activity.bannerImageUrl})` }}
                />
              </Link>
            ))
            ) : (
              <div>최근에 방문한 체험 내역이 없습니다.</div>
            )
          }
        </div>
      </div>}
    </>
  );
};

export default RecentViewedActivity;
