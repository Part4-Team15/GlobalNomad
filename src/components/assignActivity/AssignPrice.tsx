import React from 'react';

const AssignPrice = () => (
  <div className=" flex w-[100%] flex-col items-start gap-4">
    <span className=" text-black text-2xl font-bold">가격</span>
    <div className=" flex pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
      <input className="w-[100%] outline-none" placeholder="가격" />
    </div>
  </div>
);

export default AssignPrice;
