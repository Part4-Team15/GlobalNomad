import React from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ModifyData, Schedule } from '@/types/modifyActivityPage';
import patchModifyMyActivity from '@/api/patchMyActivity';
import queryKeys from '@/api/reactQuery/queryKeys';
import Toast from '@/utils/Toast';
import useCheckModifyData from '@/hooks/useCheckModifyData';
import useMergeModifyData from '@/hooks/useMergeModifyData';

interface ModifyHeaderProps {
  id: string;
  schedules: Schedule[];
}

const ModifyHeader = ({ id, schedules }: ModifyHeaderProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { checkRequireData } = useCheckModifyData();
  const { mergeSchedule, initialModifySchedule, initialScheduleId, initialModifyData } =
    useMergeModifyData();
  const data = useQuery({ queryKey: queryKeys.modifyData() }).data as ModifyData;

  const mutation = useMutation({
    mutationFn: async ({ data: modifyData, id: modifyId }: { data: ModifyData; id: string }) => {
      return patchModifyMyActivity(modifyData, modifyId);
    },
    onSuccess: () => {
      Toast.success('수정 성공!!'); // 성공 시 모달 열기
      queryClient.invalidateQueries({ queryKey: queryKeys.activities() }); // 쿼리 무효화
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

  const handleModifyData = async () => {
    if (checkRequireData(data)) {
      mutation.mutate({ data, id });
    }
  };

  return (
    <div className="w-[100%] flex justify-between pr-2">
      <span className=" text-black font-bold text-[32px]">내 체험 수정</span>
      <button
        type="button"
        className="flex h-12 px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-black text-white text-base font-bold"
        onClick={handleModifyData}
      >
        수정하기
      </button>
    </div>
  );
};

export default ModifyHeader;
