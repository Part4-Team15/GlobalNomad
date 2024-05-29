import React from 'react';
// import { useQueryClient } from '@tanstack/react-query';
// import { AssignData } from '@/types/assignActivityPage';

const AssignTitle = () => {
  // const queryClient = useQueryClient();

  // const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   queryClient.setQueryData<AssignData>(['assignData'], (oldData) => {
  //     return { ...oldData, title: e.target.value };
  //   });
  // };

  return (
    <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
      <input
        className="w-[100%] outline-none"
        // onChange={handleChangeTitle}
        placeholder="제목"
      />
    </div>
  );
};

export default AssignTitle;
