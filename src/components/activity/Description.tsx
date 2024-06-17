import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import getActivity from '@/api/getActivity';
import { ActivityType } from '@/types/activityPage';
import Map from './Map';

const Description = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: activity,
    isLoading: activityLoading,
    isError: activityError,
  } = useQuery<ActivityType>({
    queryKey: queryKeys.activity(id || ''),
    queryFn: async () => {
      if (!id) {
        throw new Error('해당 체험은 존재하지 않습니다');
      }
      return getActivity(id);
    },
    enabled: !!id,
  });

  if (activityLoading) {
    return <div>설명을 불러오고 있습니다</div>;
  }

  if (activityError || !activity) {
    return <div>설명을 불러오지 못했습니다</div>;
  }

  const { address, description } = activity;

  return (
    <div className="flex flex-col w-full gap-4 sm:gap-0">
      <div className="w-full h-[1px] bg-gray-40" />
      <h2 className="text-xl font-bold pt-6 sm:pt-4">체험 설명</h2>
      <p className="text-base font-normal text-gray-80 pb-6">{description}</p>
      <div className="w-full h-[1px] bg-gray-40" />
      <Map location={address} />
      <div className="w-full h-[1px] bg-gray-40" />
    </div>
  );
};

export default Description;
