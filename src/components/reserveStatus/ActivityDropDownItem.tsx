import { Dispatch, SetStateAction } from 'react';

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

interface ActivityDropDownItemProps {
  activityTitle: string;
  setSelectedActivity: Dispatch<SetStateAction<Activity | null>>;
  activity: Activity;
}

const ActivityDropDownItem = ({
  activityTitle,
  setSelectedActivity,
  activity,
}: ActivityDropDownItemProps) => {
  const handleClickDropDown = () => {
    setSelectedActivity(activity);
  };
  return (
    <button type="button" onClick={handleClickDropDown}>
      <li className="px-4 py-4 cursor-pointer hover:bg-gray-50 text-left">{activityTitle}</li>
    </button>
  );
};

export default ActivityDropDownItem;
