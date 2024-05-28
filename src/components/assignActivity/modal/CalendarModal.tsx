import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface CalendarModalProps {
  onSelect: (date: string) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const formatDate = (date: SelectedDate): string => {
    const formatSingleDate = (d: Date): string => {
      const year = d.getFullYear().toString().slice(2); // 연도 두 자리
      const month = (d.getMonth() + 1).toString().padStart(2, '0'); // 월 두 자리
      const day = d.getDate().toString().padStart(2, '0'); // 일 두 자리
      return `${year}/${month}/${day}`;
    };

    if (Array.isArray(date)) {
      return `${formatSingleDate(date[0] as Date)} - ${formatSingleDate(date[1] as Date)}`;
    }
    return date ? formatSingleDate(date as Date) : '';
  };

  const handleDateChange = (newDate: SelectedDate) => {
    setSelectedDate(newDate);
    if (!Array.isArray(newDate) && newDate !== null) {
      onSelect(formatDate(newDate));
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl sm:max-w-lg">
        <Calendar
          className="react-calendar w-full  text-xl"
          onChange={handleDateChange}
          value={selectedDate}
        />
        <span>선택한 날짜 : {formatDate(selectedDate)}</span>
      </div>
    </div>
  );
};
export default CalendarModal;
