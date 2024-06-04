import React, { useState } from 'react';
import Calendar from 'react-calendar';
import dateToString from '@/utils/dateToString';
import '@/styles/ReactCalendar.module.css';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface CalendarModalProps {
  onSelect: (date: string) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const formatDate = (date: SelectedDate): string => {
    if (Array.isArray(date)) {
      return `${dateToString(date[0] as Date)} - ${dateToString(date[1] as Date)}`;
    }
    return date ? dateToString(date as Date) : '';
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
