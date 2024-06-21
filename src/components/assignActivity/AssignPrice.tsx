import React from 'react';

import useMergeAssignData from '@/hooks/useMergeAssignData';

const AssignPrice = () => {
  const { mergePrice } = useMergeAssignData();

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    mergePrice(e.target.value);
  };

  return (
    <div className=" flex w-[100%] flex-col items-start gap-4">
      <span className=" text-black text-2xl font-bold  dark:text-darkMode-white-10">가격</span>
      <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white dark:bg-darkMode-black-20 dark:text-darkMode-white-10">
        <input
          type="number"
          className="w-[100%] outline-none dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
          onChange={handleChangePrice}
          placeholder="숫자만 입력해주세요"
        />
      </div>
    </div>
  );
};

export default AssignPrice;
