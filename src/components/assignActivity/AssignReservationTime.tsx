import React from 'react';

import ReservationDate from './reservation/ReservationDate';
import ReservationStartTime from './reservation/ReservationStartTime';
import ReservationEndTime from './reservation/ReservationEndTime';

const AssignReservationTime = () => {
  return (
    <div className=" flex w-[100%] flex-col items-start gap-6">
      <span className=" text-black text-2xl font-bold">예약 가능한 시간대</span>
      <div className=" flex w-[100%] flex-col items-start gap-[21px]">
        <div className="flex w-[100%] items-start gap-5">
          {/* 날짜 */}
          <ReservationDate />
          {/* 날짜 */}

          <div className=" flex h-[70px] w-[100%] items-center gap-3">
            {/* 시작 시간 */}
            <ReservationStartTime />
            {/* 시작 시간 */}

            <span className=" mt-4">~</span>
            {/* 종료 시간 */}
            <ReservationEndTime />
            {/* 종료 시간 */}
          </div>

          <img
            className="mt-6 h-[46px]"
            src="/assets/plus_time_btn.svg"
            alt="plusTimeBtn"
          />
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default AssignReservationTime;
