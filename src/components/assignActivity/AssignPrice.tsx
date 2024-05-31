import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AssignData } from '@/types/assignActivityPage';
import mergeAssignData from './utils/mergeAssignData';

const AssignPrice = () => {
  const queryClient = useQueryClient();

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
      return mergeAssignData(oldData, { price: Number(e.target.value) });
    });
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-4">
      <span className=" text-black text-2xl font-bold">가격</span>
      <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
        <input
          className="w-[100%] outline-none"
          onChange={handleChangePrice}
          placeholder="숫자만 입력해주세요"
        />
      </div>
    </div>
  );
};

export default AssignPrice;
