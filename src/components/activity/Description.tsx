import { ActivityType } from '@/types/activityPage';
import Map from './Map';

interface DescriptionProps {
  activity: ActivityType;
}

const Description: React.FC<DescriptionProps> = ({ activity }) => {
  const { address, description } = activity;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="w-full h-[1px] bg-gray-40" />
      <h2 className="text-xl font-bold pt-6">체험 설명</h2>
      <p className="text-base font-normal text-gray-80 pb-6">{description}</p>
      <div className="w-full h-[1px] bg-gray-40" />
      <Map location={address} />
      <div className="w-full h-[1px] bg-gray-40" />
    </div>
  );
};

export default Description;
