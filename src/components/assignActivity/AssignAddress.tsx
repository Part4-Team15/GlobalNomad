import React from 'react';

const AssignAddress = () => (
  <div className=" flex w-[100%] flex-col items-start gap-4">
    <div className="w-[100%] flex justify-between pr-2">
      <span className=" text-black text-2xl font-bold">주소</span>
      <button
        className="flex px-4 py-2 content-center gap-1 items-center self-stretch rounded bg-black text-white text-sm font-bold"
        type="button"
      >
        주소 찾기
      </button>
    </div>
    <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
      <input
        className="w-[100%] outline-none"
        placeholder="주소를 입력해주세요"
      />
    </div>
  </div>
);

export default AssignAddress;
