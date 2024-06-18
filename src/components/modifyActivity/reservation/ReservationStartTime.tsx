import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import useMergeModifyData from '@/hooks/useMergeModifyData';
import StartTimeDropDown from '../dropDown/StartTimeDropDown';

const ReservationStartTime = () => {
  const { mergeStartTime } = useMergeModifyData();
  const [isStartTimeDropDown, setIsStartTimeDropDown] = useState<boolean>(false);

  const { data: startTime = '' } = useQuery<string>({
    queryKey: queryKeys.modifyScheduleStartTime(),
  });

  // 시작 시간 밑의 드랍다운
  const handleStartTimeDropDown = () => {
    setIsStartTimeDropDown(!isStartTimeDropDown);
  };

  const handleSelectStart = (time: string) => {
    mergeStartTime(time);
    setIsStartTimeDropDown(!isStartTimeDropDown);
  };

  return (
    <div className=" w-[100%] relative">
      <div className="flex w-[100%] flex-col ">
        <label>시작 시간</label>
        <div className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white">
          <input className="w-[100%] outline-none" placeholder="0:00" value={startTime} readOnly />
          <button type="button" onClick={handleStartTimeDropDown}>
            <img
              src={isStartTimeDropDown ? '/assets/arrow_up.svg' : '/assets/arrow_down.svg'}
              alt="arrowIcon"
            />
          </button>
        </div>
      </div>
      {isStartTimeDropDown && <StartTimeDropDown onSelect={handleSelectStart} />}
    </div>
  );
};

export default ReservationStartTime;
