import Map from './Map';

interface Activity {
  title: string;
  category: string;
  rating: string;
  address: string;
  reviewCount: string;
  description: string;
}

interface DescriptionProps {
  activity: Activity;
}

const Description: React.FC<DescriptionProps> = ({ activity }) => {
  const { address: location, description } = activity;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="w-full h-0.5 bg-gray-40" />
      <h2 className="text-xl font-bold pt-6">체험 설명</h2>
      <p className="text-base font-normal text-gray-80 pb-6">{description}</p>
      <div className="w-full h-0.5 bg-gray-40" />
      <Map location={location} />
      <div className="w-full h-0.5 bg-gray-40" />
    </div>
  );
};

export default Description;
