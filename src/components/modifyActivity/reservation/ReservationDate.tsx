import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/api/reactQuery/queryKeys';
import useMergeModifyData from '@/hooks/useMergeModifyData';
import CalendarModal from '../modal/CalendarModal';

const ReservationDate = () => {
  const { mergeDate } = useMergeModifyData();
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  // 초기값 지정
  const { data: selectedDate = '' } = useQuery<string>({
    queryKey: queryKeys.modifyScheduleDate(),
  });

  // 날짜 모달
  const handleCalendar = () => {
    setIsOpenCalendar(true);
  };

  const handleCloseCalendar = () => {
    setIsOpenCalendar(false);
  };

  const handleDateSelect = (date: string) => {
    mergeDate(date);
    setIsOpenCalendar(false);
  };

  return (
    <div className=" w-[100%] relative">
      <div className="flex w-[100%] flex-col">
        <label>날짜</label>
        <div className=" flex w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60 bg-white">
          <input
            className="w-[100%] outline-none"
            placeholder="YYYY-MM-DD"
            value={selectedDate}
            readOnly
          />
          <button type="button" onClick={handleCalendar}>
            <img src="/assets/calendar_icon.svg" alt="calendarIcon" />
          </button>
        </div>
      </div>
      {isOpenCalendar && (
        <CalendarModal onSelect={handleDateSelect} onClose={handleCloseCalendar} />
      )}
    </div>
  );
};

export default ReservationDate;
