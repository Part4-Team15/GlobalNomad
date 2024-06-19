import { MouseEvent, useEffect, useState } from 'react';
import { CurrentViewedActivity, getRecentlyViewedActivities } from '@/utils/saveRecentActivities';
import '../../styles/customScrollbar.css';
import ModalPortal from '../review/ModalPortal';
import RecentViewedActivityCard from './RecentViewedActivityCard';

const RecentViewedActivity = () => {
  const [showList, setShowList] = useState(false);
  const [recentViewedList, setRecentViewedList] = useState([]);

  const handleClick = () => {
    setShowList(!showList);
  }

  const handleOutsideClick = () => {
    setShowList(false);
  }

  const handleNotClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  useEffect(() => {
    const viewedList = getRecentlyViewedActivities();
    setRecentViewedList(viewedList);
  }, []);

  return (
    <>
      <button
        className="fixed top-1/4 -right-[2px] border border-green-10 rounded-l-md shadow-sm cursor-pointer"
        type='button'
        onClick={handleClick}
      >
        <img
          className="w-8 rounded-l-md"
          src={showList ? '/assets/pagination_arrow_right.svg' : '/assets/pagination_arrow_left.svg'}
          alt='show or hide recent activity List'
        />
      </button>
      {showList && (
      <ModalPortal>
        <div className="fixed inset-0 z-10 bg-black bg-opacity-0" onClick={handleOutsideClick}>
          <div onClick={handleNotClose}>
            <div className="fixed top-1/4 right-12 rounded-2xl bg-white border border-green-700 shadow-green-10 shadow-custom px-4 pt-3 pb-4 z-10">
              <p className="text-lg text-center font-medium pb-3">내가 최근 둘러본 체험</p>
              <div
                className="w-40 h-72 flex flex-col items-center gap-4 overflow-y-scroll custom-scrollbar pb-4"
              >
                {recentViewedList.length ?
                  (recentViewedList.map((activity: CurrentViewedActivity) => (
                    <RecentViewedActivityCard {...activity} />
                  ))
                  ) : (
                    <div>최근에 방문한 체험 내역이 없습니다.</div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </ModalPortal>
      )}
    </>
  );
};

export default RecentViewedActivity;
