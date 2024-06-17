import { useMutation } from '@tanstack/react-query';
import postActivityReservation from '@/api/postActivityReservation';
import queryClient from '@/lib/queryClient';
import queryKeys from '@/api/reactQuery/queryKeys';

interface PostActivityReservationResponse {
  scheduleId: number;
  headCount: number;
}

const useSubmitReserve = (id: string) => {
  return useMutation<
    PostActivityReservationResponse,
    Error,
    { selectedTimeId: number; attendeeCount: number; id: string }
  >({
    mutationFn: postActivityReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.availableSchedules(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reservedSchedules() });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
};

export default useSubmitReserve;
