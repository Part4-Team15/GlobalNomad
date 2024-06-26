import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import useMergeAssignData from '@/hooks/useMergeAssignData';
import useClickOutside from '@/hooks/useClickOutside';
import EndTimeDropDown from '../dropDown/EndTimeDropDown';

const ReservationEndTime = () => {
  const { mergeEndTime } = useMergeAssignData();
  const [isEndTimeDropDown, setIsEndTimeDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { data: endTime = '' } = useQuery<string>({
    queryKey: queryKeys.assignEndTime(),
  });

  const handleEndTimeDropDown = () => {
    setIsEndTimeDropDown(!isEndTimeDropDown);
  };

  const handleSelectEnd = (time: string) => {
    mergeEndTime(time);
    setIsEndTimeDropDown(!isEndTimeDropDown);
  };

  useClickOutside(dropDownRef, () => setIsEndTimeDropDown(false));

  return (
    <div className=" w-[100%] relative" ref={dropDownRef}>
      <div className="flex w-[100%] flex-col ">
        <label className="dark:text-darkMode-gray-10">종료 시간</label>
        <div
          className=" flex h-[46px] w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white cursor-pointer dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
          onClick={handleEndTimeDropDown}
        >
          <input
            className="w-[100%] outline-none cursor-pointer dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
            placeholder="0:00"
            value={endTime}
            readOnly
          />
          <button type="button">
            <img
              src={isEndTimeDropDown ? '/assets/arrow_up.svg' : '/assets/arrow_down.svg'}
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
