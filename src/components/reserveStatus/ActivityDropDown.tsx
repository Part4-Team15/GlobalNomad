import { useEffect, forwardRef, Dispatch, SetStateAction, useRef } from 'react';

import ActivityDropDownItem from './ActivityDropDownItem';

interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ActivityDropDownProps {
  activities: Activity[];
  inView: boolean;
  fetchNextPage: () => void;
  setViewActivityDropDown: Dispatch<SetStateAction<boolean>>;
  setSelectedActivity: Dispatch<SetStateAction<Activity | null>>;
  viewActivityDropDown: boolean;
}

const ActivityDropDown = forwardRef<HTMLDivElement, ActivityDropDownProps>(
  (
    {
      activities,
      inView,
      fetchNextPage,
      setViewActivityDropDown,
      setSelectedActivity,
      viewActivityDropDown,
    },
    ref,
  ) => {
    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [inView, fetchNextPage]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const clickOutside = (e: any) => {
        if (viewActivityDropDown && !dropdownRef.current?.contains(e.target)) {
          setViewActivityDropDown(false);
        }
      };
      document.addEventListener('click', clickOutside);
      return () => {
        document.removeEventListener('click', clickOutside);
      };
    }, [viewActivityDropDown, setViewActivityDropDown]);

    const handleCloseDropDown = () => {
      setViewActivityDropDown(false);
    };

    return (
      <div
        className="border border-black bg-white top-[30px] z-10 h-[300px] overflow-y-auto"
        ref={dropdownRef}
      >
        <ul className="flex flex-col" onClick={handleCloseDropDown}>
          {activities.map((activity) => (
            <ActivityDropDownItem
              activity={activity}
              key={activity.id}
              activityTitle={activity.title}
              setSelectedActivity={setSelectedActivity}
            />
          ))}
          <div ref={ref} className="w-[10px] h-[10px]" />
        </ul>
      </div>
    );
  },
);

export default ActivityDropDown;
