import { useQuery } from '@tanstack/react-query';
import { ActivityType } from '@/types/activityPage';
import queryKeys from '@/api/reactQuery/queryKeys';
import getActivity from '@/api/getActivity';

const useActivityQuery = (id: string) => {
  return useQuery<ActivityType>({
    queryKey: queryKeys.activity(id || ''),
    queryFn: async () => {
      if (!id) {
        throw new Error('해당 체험은 존재하지 않습니다');
      }
      return getActivity(id);
    },
    enabled: !!id,
  });
};

export default useActivityQuery;
