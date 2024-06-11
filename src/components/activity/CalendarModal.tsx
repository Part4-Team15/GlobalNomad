import moment from 'moment';
import Calendar from 'react-calendar';
import { useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { AvailableDate } from '@/types/activityPage';
import { StyledReserveCalendarWrapper } from '@/styles/StyledReserveCalendar';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface CalendarModalProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDateChange: (newDate: SelectedDate) => void;
  tileClassName: ({ date, view }: { date: Date; view: string }) => 'available' | null;
  handleSelectTime: React.MouseEventHandler<HTMLDivElement>;
  selectedTimeId: number | undefined;
  actualAvailableTimes: AvailableDate[];
  yearMonthDay: string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  setModalIsOpen,
  handleDateChange,
  tileClassName,
  handleSelectTime,
  selectedTimeId,
  actualAvailableTimes,
  yearMonthDay,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleModalClose = () => setModalIsOpen(false);

  useClickOutside(modalRef, () => setModalIsOpen(false));

  return (
    <div
      className="flex flex-col absolute top-[-124px] right-[-20px] z-20 w-[400px] rounded-md bg-white shadow-md border-1 py-6 px-4 gap-3 h-auto overflow-y-auto"
      ref={modalRef}
    >
      <div className="w-full flex justify-between">
        <div className="font-bold text-2xl">날짜</div>
        <button type="button" onClick={handleModalClose}>
          <img className="w-5 cursor-pointer" src="/assets/x_btn.svg" alt="Close Box Button" />
        </button>
      </div>
      <StyledReserveCalendarWrapper>
        <Calendar
          tileClassName={tileClassName}
          onChange={handleDateChange}
          calendarType="gregory"
          formatDay={(__, date) => moment(date).format('D')}
          formatMonthYear={(__, date) => moment(date).format('MMMM YYYY')}
          formatShortWeekday={(__, date) => moment(date).format('ddd')}
          showNeighboringMonth={false}
          minDetail="month"
          minDate={new Date()}
          next2Label={null}
          prev2Label={null}
        />
      </StyledReserveCalendarWrapper>
      <div className="font-bold text-lg">예약 가능한 시간</div>
      {/* 예약 시간 선택 */}
      <div className="flex flex-wrap gap-2">
        {actualAvailableTimes?.map((availableSchedule) => {
          if (availableSchedule.date === yearMonthDay) {
            return availableSchedule.times.map((time) => {
              const isSelected = selectedTimeId === time.id;
              return (
                <div
                  key={time.id}
                  className={`w-28 border-2 border-solid rounded-lg text-center p-2.5
                    ${isSelected ? 'bg-nomad-black text-white' : 'bg-white text-nomad-black'}
                    hover:bg-nomad-black hover:text-white`}
                  onClick={handleSelectTime}
                  data-time-id={time.id}
                >
                  {`${time.startTime}~${time.endTime}`}
                </div>
              );
            });
          }
          return null;
        })}
      </div>
      <button
        type="button"
        className="w-full bg-nomad-black rounded text-white text-center p-3 font-bold text-base"
        onClick={handleModalClose}
      >
        선택하기
      </button>
    </div>
  );
};

export default CalendarModal;
