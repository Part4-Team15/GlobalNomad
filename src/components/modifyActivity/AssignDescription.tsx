import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AssignData } from '@/types/assignActivityPage';
import mergeAssignData from './utils/mergeAssignData';

const AssignDescription = () => {
  const queryClient = useQueryClient();

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
      return mergeAssignData(oldData, { description: e.target.value });
    });
  };

  return (
    <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
      <textarea
        className="w-[100%] h-[346px] outline-none resize-none"
        onChange={handleChangeDescription}
        placeholder="설명"
      />
    </div>
  );
};

export default AssignDescription;
