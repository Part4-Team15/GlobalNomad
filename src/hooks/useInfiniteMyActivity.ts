import getMyActivity from '@/api/getMyActivity';
import queryKeys from '@/api/reactQuery/queryKeys';
import { MyActivityType } from '@/types/myActivityPage';
import { useInfiniteQuery } from '@tanstack/react-query';

const useInfiniteMyActivity = () => {
  const { data, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery<MyActivityType>({
    queryKey: queryKeys.activities(),
    queryFn: getMyActivity,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  return { myActivityData: data, fetchNextPage, isLoading, isFetchingNextPage };
};

export default useInfiniteMyActivity;
