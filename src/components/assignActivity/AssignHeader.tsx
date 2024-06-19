import React from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AssignData } from '@/types/assignActivityPage';
import postAssignMyActivity from '@/api/postMyActivity';
import queryKeys from '@/api/reactQuery/queryKeys';
import Toast from '@/utils/Toast';
import useCheckAssignData from '@/hooks/useCheckAssignData';
import useMergeAssignData from '@/hooks/useMergeAssignData';

const AssignHeader = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { checkRequireData } = useCheckAssignData();
  const { initialAssignData } = useMergeAssignData();
  const data = useQuery({ queryKey: queryKeys.assignData() }).data as AssignData;

  const mutation = useMutation({
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

  const handleAssignData = async () => {
    if (checkRequireData(data)) {
      mutation.mutate(data);
    }
  };

  return (
    <div className="w-[100%] flex justify-between pr-2">
      <span className=" text-black font-bold text-[32px]">내 체험 등록</span>
      <button
        type="button"
        className="flex h-12 px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-black text-white text-base font-bold"
        onClick={handleAssignData}
      >
        등록하기
      </button>
    </div>
  );
};

export default AssignHeader;
