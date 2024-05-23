import React from 'react';

const AssignHeader = () => (
  <div className="w-[100%] flex justify-between pr-2">
    <span className=" text-black font-bold text-[32px]">내 체험 등록</span>
    <button
      type="button"
      className="flex h-12 px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-black text-white text-base font-bold"
    >
      등록하기
    </button>
  </div>
);

export default AssignHeader;
