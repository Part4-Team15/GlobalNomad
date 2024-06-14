import { useInfiniteQuery } from '@tanstack/react-query';
import getMyReservation from '@/api/getMyReservation';
import { Page } from '@/types/myReservationHistory';

const useInfiniteReservation = (status: string) => {
  const { data, fetchNextPage } = useInfiniteQuery<Page>({
    queryKey: ['reservations', 4, status],
    queryFn: getMyReservation,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });

  return { reservationData: data, fetchNextPage };
};

export default useInfiniteReservation;
