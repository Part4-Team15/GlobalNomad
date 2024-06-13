import postSubmitReview from '@/api/postSubmitReview';
import queryClient from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// 커스텀 훅
const useSubmitReview = () => {
  return useMutation({
    mutationFn: postSubmitReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          console.error('이미 작성된 후기가 있습니다.');
        } else {
          console.error('리뷰 제출 실패:', error);
        }
      } else {
        console.error('리뷰 제출 실패:', error);
      }
    },
  });
};

export default useSubmitReview;
