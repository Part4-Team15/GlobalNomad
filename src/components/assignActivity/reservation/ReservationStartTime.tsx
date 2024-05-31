import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import StartTimeDropDown from '../dropDown/StartTimeDropDown';

const ReservationStartTime = () => {
  const queryClient = useQueryClient();
  const [isStartTimeDropDown, setIsStartTimeDropDown] =
    useState<boolean>(false);

  const [startTime, setStartTime] = useState<string>('');

  // 시작 시간 밑의 드랍다운
  const handleStartTimeDropDown = () => {
    setIsStartTimeDropDown(!isStartTimeDropDown);
  };

  const handleSelectStart = (time: string) => {
    setStartTime(time);
    queryClient.setQueryData(['assign/StartTime'], time);
    setIsStartTimeDropDown(!isStartTimeDropDown);
  };

  return (
    <div className=" w-[100%] relative">
      <div className="flex w-[100%] flex-col ">
        <span>시작 시간</span>
        <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
          <input
            className="w-[100%] outline-none"
            placeholder="0:00"
            value={startTime}
            readOnly
          />
          <button type="button" onClick={handleStartTimeDropDown}>
            <img
              src={
                isStartTimeDropDown
                  ? '/assets/arrow_up.svg'
                  : '/assets/arrow_down.svg'
              }
              alt="arrowIcon"
            />
          </button>
        </div>
      </div>
      {isStartTimeDropDown && (
        <StartTimeDropDown onSelect={handleSelectStart} />
      )}
    </div>
  );
};

export default ReservationStartTime;
