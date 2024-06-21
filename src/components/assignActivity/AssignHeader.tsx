import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AssignData } from '@/types/assignActivityPage';
import queryKeys from '@/api/reactQuery/queryKeys';
import useCheckAssignData from '@/hooks/useCheckAssignData';

import useMutationAssignData from '@/hooks/useMutateAssignData';

const AssignHeader = () => {
  const { assignMutation } = useMutationAssignData();
  const { checkRequireData } = useCheckAssignData();
  const data = useQuery({ queryKey: queryKeys.assignData() }).data as AssignData;

  const handleAssignData = async () => {
    if (checkRequireData(data)) {
      assignMutation.mutate(data);
    }
  };

  return (
    <div className="w-[100%] flex justify-between pr-2">
      <span className=" text-black font-bold text-[32px] dark:text-darkMode-white-10">
        내 체험 등록
      </span>
      <button
        type="button"
        className="flex h-12 px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-[#112211] text-white text-base font-bold"
        onClick={handleAssignData}
      >
        등록하기
      </button>
    </div>
  );
};

export default AssignHeader;
