import React from 'react';

const ReservationForm = () => {
  return (
    <div className="flex w-[100%] flex-col items-start gap-[21px]">
      <div className="border-t-2 border-gray-30 w-full" />
      <div className="flex w-[100%] items-start gap-5">
        {/* 날짜 */}

        {/* 날짜 */}

        <div className=" flex h-[70px] w-[100%] items-center gap-3">
          {/* 시작 시간 */}

          {/* 시작 시간 */}

          <span className=" mt-4">~</span>
          {/* 종료 시간 */}

          {/* 종료 시간 */}
        </div>

        <img
          className="mt-6 h-[46px]"
          src="/assets/plus_time_btn.svg"
          alt="plusTimeBtn"
        />
      </div>
    </div>
  );
};

export default ReservationForm;
