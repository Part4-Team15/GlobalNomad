import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import useMergeModifyData from '@/hooks/useMergeModifyData';
import useClickOutside from '@/hooks/useClickOutside';
import StartTimeDropDown from '../dropDown/StartTimeDropDown';

const ReservationStartTime = () => {
  const { mergeStartTime } = useMergeModifyData();
  const [isStartTimeDropDown, setIsStartTimeDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const { data: startTime = '' } = useQuery<string>({
    queryKey: queryKeys.modifyScheduleStartTime(),
  });

  const handleStartTimeDropDown = () => {
    setIsStartTimeDropDown(!isStartTimeDropDown);
  };

  const handleSelectStart = (time: string) => {
    mergeStartTime(time);
    setIsStartTimeDropDown(!isStartTimeDropDown);
  };

  useClickOutside(dropDownRef, () => setIsStartTimeDropDown(false));

  return (
    <div className=" w-[100%] relative" ref={dropDownRef}>
      <div className="flex w-[100%] flex-col ">
        <label className="dark:text-darkMode-gray-10">시작 시간</label>
        <div
          className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white cursor-pointer dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
          onClick={handleStartTimeDropDown}
        >
          <input
            className="w-[100%] outline-none cursor-pointer dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
            placeholder="0:00"
            value={startTime}
            readOnly
          />
          <button type="button">
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
