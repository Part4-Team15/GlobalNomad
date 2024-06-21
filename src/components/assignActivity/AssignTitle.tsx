import React from 'react';
import useMergeAssignData from '@/hooks/useMergeAssignData';

const AssignTitle = () => {
  const { mergeTitle } = useMergeAssignData();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    mergeTitle(e.target.value);
  };

  return (
    <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white dark:bg-darkMode-black-20 dark:text-darkMode-white-10">
      <input
        className="w-[100%] outline-none dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
        onChange={handleChangeTitle}
        placeholder="제목"
      />
    </div>
  );
};

export default AssignTitle;
