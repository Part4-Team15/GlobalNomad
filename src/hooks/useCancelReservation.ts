import { useMutation } from '@tanstack/react-query';
import cancelReservation from '@/api/cancelReservation';
import queryClient from '@/lib/queryClient';

const useCancelReservation = () => {
  return useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error: unknown) => {
      console.error('취소 실패:', error);
    },
  });
};

export default useCancelReservation;
