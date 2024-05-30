import React, { useState } from 'react';
import CalendarModal from '../modal/CalendarModal';

const ReservationDate = () => {
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // 날짜 모달
  const handleCalendar = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setIsOpenCalendar(false);
  };

  return (
    <div className=" w-[100%] relative">
      <div className="flex w-[100%] flex-col">
        <span>날짜</span>
        <div className=" flex w-[100%] pt-2 pr-4 pb-2 pl-4 items-center self-stretch rounded-[4px] border border-gray-60">
          <input
            className="w-[100%] outline-none"
            placeholder="YY/MM/DD"
            value={selectedDate}
            readOnly
          />
          <button type="button" onClick={handleCalendar}>
            <img src="/assets/calendar_icon.svg" alt="calendarIcon" />
          </button>
        </div>
      </div>
      {isOpenCalendar && <CalendarModal onSelect={handleDateSelect} />}
    </div>
  );
};

export default ReservationDate;
