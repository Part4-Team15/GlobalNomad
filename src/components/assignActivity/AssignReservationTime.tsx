import React from 'react';

const AssignReservationTime = () => (
  <div className=" flex w-[100%] flex-col items-start gap-6">
    <span className=" text-black text-2xl font-bold">예약 가능한 시간대</span>
    <div className=" flex w-[100%] flex-col items-start gap-[21px]">
      <div className="flex w-[100%] items-start gap-5">
        <div className="flex w-[100%] flex-col">
          <span>날짜</span>
          <div className=" flex w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
            <input className="w-[100%] outline-none" placeholder="YY/MM/DD" />
            <img src="/assets/calendar_icon.svg" alt="calendarIcon" />
          </div>
        </div>

        <div className=" flex h-[70px] w-[100%] items-center gap-3">
          <div className="flex w-[100%] flex-col ">
            <span>시작 시간</span>
            <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
              <input className="w-[100%] outline-none" placeholder="0:00" />
              <img src="/assets/arrow_down.svg" alt="arrowDownIcon" />
            </div>
          </div>

          <span className=" mt-4">~</span>

          <div className="flex w-[100%] flex-col ">
            <span>종료 시간</span>
            <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
              <input className="w-[100%] outline-none" placeholder="0:00" />
              <img src="/assets/arrow_down.svg" alt="arrowDownIcon" />
            </div>
          </div>
        </div>

        <img
          className="mt-6 h-[46px]"
          src="/assets/plus_time_btn.svg"
          alt="plusTimeBtn"
        />
      </div>
    </div>
  </div>
);

export default AssignReservationTime;
