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

interface ActivityDropDownListItemProps {
  activity: Activity;
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
  title: string;
  setViewDropDownList: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActivityDropDownListItem = ({
  activity,
  setSelectedActivity,
  title,
  setViewDropDownList,
}: ActivityDropDownListItemProps) => {
  const onClickListItem = () => {
    setViewDropDownList((prev) => !prev);
    setSelectedActivity(activity);
  };
  return (
    <li
      className="px-5 py-5 border-b border-gray-70 last:border-b-0 hover:bg-sky-200 cursor-pointer"
      onClick={onClickListItem}
    >
      {title}
    </li>
  );
};

export default ActivityDropDownListItem;
