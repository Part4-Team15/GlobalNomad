import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import { AvailableReservationsType } from '@/types/activityPage';
import getAllMyReservation from '@/api/getAllMyReservation';

const useReservedScheduleQuery = () => {
  return useQuery<AvailableReservationsType>({
    queryKey: queryKeys.reservedSchedules(),
    queryFn: getAllMyReservation,
  });
};

export default useReservedScheduleQuery;
