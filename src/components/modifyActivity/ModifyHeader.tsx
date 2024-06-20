import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ModifyData, Schedule } from '@/types/modifyActivityPage';
import queryKeys from '@/api/reactQuery/queryKeys';
import useCheckModifyData from '@/hooks/useCheckModifyData';
import useMutationModifyData from '@/hooks/useMutateModifyData';

interface ModifyHeaderProps {
  id: string;
  schedules: Schedule[];
}

const ModifyHeader = ({ id, schedules }: ModifyHeaderProps) => {
  const { checkRequireData } = useCheckModifyData();
  const { modifyMutation } = useMutationModifyData({ schedules });

  const data = useQuery({ queryKey: queryKeys.modifyData() }).data as ModifyData;

  const handleModifyData = async () => {
    if (checkRequireData(data)) {
      modifyMutation.mutate({ data, id });
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
