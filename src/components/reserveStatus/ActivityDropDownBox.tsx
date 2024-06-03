import { useState } from 'react';
import ActivityDrownDownList from './ActivityDropDownList';

interface Activity {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  address: string;
  bannerImageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface ActivityDropDownBoxProps {
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
  activities?: Activity[];
  selectedActivity: Activity | null;
}
const ActivityDropDownBox = ({
  setSelectedActivity,
  activities,
  selectedActivity,
}: ActivityDropDownBoxProps) => {
  const [viewDropDownList, setViewDropDownList] = useState(false);

  const toggleDropDown = () => {
    setViewDropDownList((prev) => !prev);
  };
  return (
    <div className="relative">
      <label className="absolute bg-white top-[-10px] left-4 text-[#121121] px-1">체험 목록</label>
      <input
        className="rounded border border-gray-70 w-full pl-4 py-5 outline-none"
        value={selectedActivity?.title}
      />
      <button type="button" onClick={toggleDropDown}>
        <img
          src="assets/chevron_down.svg"
          alt="chevron-down-icon"
          className="absolute w-6 top-5 right-3 cursor-pointer"
        />
      </button>
      {viewDropDownList && (
        <ActivityDrownDownList
          activities={activities}
          setSelectedActivity={setSelectedActivity}
          setViewDropDownList={setViewDropDownList}
        />
      )}
    </div>
  );
};

export default ActivityDropDownBox;
