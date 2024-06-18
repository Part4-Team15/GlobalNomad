import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/customScrollbar.css';

const getCurrentViewedActivity = () => {
  const storedData = localStorage.getItem('currentViewedActivity');
  return storedData ? JSON.parse(storedData) : null;
};

// Local storage에 최근 본 게시물 목록을 저장하는 함수
const setRecentlyViewedActivities = (activity: any) => {
  localStorage.setItem('recentlyViewedActivities', JSON.stringify(activity));
};


// Local storage에서 최근 본 게시물 목록을 가져오는 함수
const getRecentlyViewedActivities = () => {
  const storedData = localStorage.getItem('recentlyViewedActivities');
  return storedData ? JSON.parse(storedData) : [];
};


const RecentViewedActivity = () => {
  const [recentViewedList, setRecentViewedList] = useState([]);

  useEffect(() => {
    const viewedActivity = getCurrentViewedActivity();

    if (viewedActivity) {
      let viewedList = getRecentlyViewedActivities();
      viewedList = viewedList.filter((activity: any) => activity.id !== viewedActivity.id);
      viewedList.unshift(viewedActivity);
      setRecentViewedList(viewedList);
      setRecentlyViewedActivities(viewedList);
    }
  }, []);


  return (
    <div className="fixed top-4 right-4 rounded-2xl bg-white border border-green-80 p-4">
      <div
        className="w-36 h-48 flex flex-col items-center gap-3 overflow-y-scroll custom-scrollbar"
      >
        {recentViewedList.length ?
          (recentViewedList.map((activity: any) => (
            <Link key={activity.id} to={`/activity/${activity.id}`}>
              <div
                className="w-24 h-24 bg-cover bg-center rounded-3xl"
                style={{ backgroundImage: `url(${activity.bannerImageUrl})` }}
              />
            </Link>
          ))
          ) : (
            <div>최근에 본 체험 내역이 없습니다.</div>
          )
        }
      </div>
    </div>
  );
};

export default RecentViewedActivity;
