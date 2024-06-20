import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AssignData } from '@/types/assignActivityPage';
import postAssignMyActivity from '@/api/postMyActivity';
import queryKeys from '@/api/reactQuery/queryKeys';
import Toast from '@/utils/Toast';
import useMergeAssignData from '@/hooks/useMergeAssignData';

const useMutationAssignData = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { initialAssignData } = useMergeAssignData();
  const assignMutation = useMutation({
    mutationFn: async (assignData: AssignData) => {
      return postAssignMyActivity(assignData);
    },
    onSuccess: () => {
      Toast.success('등록 성공!!'); // 성공 시 모달 열기
      initialAssignData(); // 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.activities() }); // 쿼리 무효화
      navigate('/my/activity');
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  return { assignMutation };
};

export default useMutationAssignData;
