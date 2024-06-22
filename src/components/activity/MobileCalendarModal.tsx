import moment from 'moment';
import Calendar from 'react-calendar';
import { useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { AvailableDate } from '@/types/activityPage';
import { StyledReserveCalendarWrapper } from '@/styles/StyledReserveCalendar';
import { ReactComponent as CloseBtn } from './assets/x_btn.svg';

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
      className="absolute bottom-0 left-0 bg-white z-20 w-full dark:bg-darkMode-black-20"
      ref={modalRef}
    >
      <div className="relative h-screen flex flex-col px-8 py-12 gap-6">
        <div className="w-full flex justify-between">
          <div className="font-bold text-3xl dark:text-darkMode-white-10">날짜</div>
          <div onClick={handleModalClose}>
            <CloseBtn className="w-10 cursor-pointer stroke-black dark:stroke-white" />
          </div>
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
        <div className="font-bold text-xl dark:text-darkMode-white-10">예약 가능한 시간</div>
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
                    hover:bg-nomad-black hover:text-white cursor-pointer`}
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
          className="absolute bottom-6 left-4 w-11/12 bg-nomad-black rounded text-white text-center p-4 font-bold text-lg"
          onClick={handleModalClose}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
