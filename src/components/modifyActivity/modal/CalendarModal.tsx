import React, { useState } from 'react';
import Calendar from 'react-calendar';
import useStore from '@/hooks/useStore';
import dateToString from '@/utils/dateToString';
import { StyledActivityCalendar } from '@/styles/StyledActivityCalendar';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface CalendarModalProps {
  onSelect: (date: string) => void;
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ onSelect, onClose }) => {
  const { darkMode } = useStore();
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

  const handleOpenModal = () => {
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleOpenModal} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl sm:max-w-lg">
        <StyledActivityCalendar $darkMode={darkMode}>
          <Calendar
            className="react-calendar w-full  text-xl"
            onChange={handleDateChange}
            value={selectedDate}
          />
        </StyledActivityCalendar>
      </div>
    </div>
  );
};
export default CalendarModal;
