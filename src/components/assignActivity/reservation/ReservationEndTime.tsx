import React, { useState } from 'react';
import EndTimeDropDown from '../dropDown/EndTimeDropDown';

const ReservationEndTime = () => {
  const [isEndTimeDropDown, setIsEndTimeDropDown] = useState<boolean>(false);
  const [time, setTime] = useState<{ startTime: string; endTime: string }>({
    startTime: '',
    endTime: '',
  });

  // 종료 시간 밑의 드랍다운
  const handleEndTimeDropDown = () => {
    setIsEndTimeDropDown(!isEndTimeDropDown);
  };

  const handleSelectEnd = (startTime: string, endTime: string) => {
    setTime({ startTime, endTime });
    setIsEndTimeDropDown(!isEndTimeDropDown);
  };

  return (
    <div className=" w-[100%] relative">
      <div className="flex w-[100%] flex-col ">
        <span>종료 시간</span>
        <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
          <input
            className="w-[100%] outline-none"
            placeholder="0:00"
            value={time.endTime}
            readOnly
          />
          <button type="button" onClick={handleEndTimeDropDown}>
            <img
              src={
                isEndTimeDropDown
                  ? '/assets/arrow_up.svg'
                  : '/assets/arrow_down.svg'
              }
              alt="arrowIcon"
            />
          </button>
        </div>
      </div>
      {isEndTimeDropDown && <EndTimeDropDown onSelect={handleSelectEnd} />}
    </div>
  );
};

export default ReservationEndTime;
