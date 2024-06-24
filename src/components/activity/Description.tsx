import { useParams } from 'react-router-dom';
import useActivityQuery from '@/hooks/useActivityQuery';
import Map from './Map';

const Description = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError,
  } = useActivityQuery(id || '');

  if (activityLoading) {
    return <div>설명을 불러오고 있습니다</div>;
  }

  if (activityError || !activity) {
    return <div>설명을 불러오지 못했습니다</div>;
  }

  const { address, description } = activity;

  return (
    <div className="flex flex-col w-full gap-4 sm:gap-0">
      <hr className="w-full h-[1px] bg-gray-40" />
      <h2 className="text-xl font-bold pt-6 sm:pt-4 dark:text-darkMode-white-10">체험 설명</h2>
      <p className="text-base font-normal text-gray-80 pb-6 dark:text-darkMode-white-20">
        {description}
      </p>
      <hr className="w-full h-[1px] bg-gray-40" />
      <Map location={address} />
      <hr className="w-full h-[1px] bg-gray-40" />
    </div>
  );
};

export default Description;
