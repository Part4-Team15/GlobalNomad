import ActivityDropDownListItem from './ActivityDropDownListItem';

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
interface ActivityDropDownListProps {
  activities?: Activity[];
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
  setViewDropDownList: React.Dispatch<React.SetStateAction<boolean>>;
}
const ActivityDrownDownList = ({
  activities,
  setSelectedActivity,
  setViewDropDownList,
}: ActivityDropDownListProps) => (
  <ul className="flex flex-col bg-white rounded absolute w-full top-[80px] border border-gray-70 h-[400px] overflow-y-auto">
    {activities?.map((activity) => {
      return (
        <ActivityDropDownListItem
          title={activity.title}
          setSelectedActivity={setSelectedActivity}
          activity={activity}
          setViewDropDownList={setViewDropDownList}
        />
      );
    })}
  </ul>
);

export default ActivityDrownDownList;
