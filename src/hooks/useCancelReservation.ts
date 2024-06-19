import { useMutation } from '@tanstack/react-query';
import cancelReservation from '@/api/cancelReservation';
import queryClient from '@/lib/queryClient';
import queryKeys from '@/api/reactQuery/queryKeys';

const useCancelReservation = () => {
  return useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reservations() });
    },
    onError: (error: unknown) => {
      console.error('취소 실패:', error);
    },
  });
};

export default useCancelReservation;
