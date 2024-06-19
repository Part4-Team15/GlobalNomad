import React from 'react';

import useMergeAssignData from '@/hooks/useMergeAssignData';

const AssignDescription = () => {
  const { mergeDescription } = useMergeAssignData();

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    mergeDescription(e.target.value);
  };

  return (
    <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white">
      <textarea
        className="w-[100%] h-[346px] outline-none resize-none"
        onChange={handleChangeDescription}
        placeholder="설명"
      />
    </div>
  );
};

export default AssignDescription;
