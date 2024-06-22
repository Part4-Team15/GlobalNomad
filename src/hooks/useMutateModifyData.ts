import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ModifyData, Schedule } from '@/types/modifyActivityPage';
import patchModifyMyActivity from '@/api/patchMyActivity';
import queryKeys from '@/api/reactQuery/queryKeys';
import Toast from '@/utils/Toast';
import useMergeModifyData from '@/hooks/useMergeModifyData';

interface MutationModifyDataProps {
  schedules: Schedule[];
}

const useMutationModifyData = ({ schedules }: MutationModifyDataProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mergeSchedule, initialModifySchedule, initialScheduleId, initialModifyData } =
    useMergeModifyData();

  const modifyMutation = useMutation({
    mutationFn: async ({ data: modifyData, id: modifyId }: { data: ModifyData; id: string }) => {
      return patchModifyMyActivity(modifyData, modifyId);
    },
    onSuccess: () => {
      Toast.success('수정 성공!!'); // 성공 시 모달 열기
      queryClient.invalidateQueries({ queryKey: queryKeys.activities() }); // 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['currentPageActivity'] });
      initialModifyData();
      navigate('/my/activity');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        Toast.error(errorMessage);
        mergeSchedule(schedules);
        initialModifySchedule();
        initialScheduleId();
      } else {
        Toast.error('수정 중 오류가 발생했습니다.');
      }
    },
  });

  return { modifyMutation };
};

export default useMutationModifyData;
