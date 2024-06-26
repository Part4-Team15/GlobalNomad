import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import getMonthAndYear from '@/utils/getMonthAndYear';
import priceToWon from '@/utils/priceToWon';
import Toast from '@/utils/Toast';
import getAvailableTimes from '@/utils/getAvailableTimes';
import { AvailableReservationsType, AvailableSchedulesType } from '@/types/activityPage';
import useWindowWidth from '@/hooks/useWindowWidth';
import useAvailableScheduleQuery from '@/hooks/useAvailableScheduleQuery';
import useReservedScheduleQuery from '@/hooks/useReservedScheduleQuery';
import useSubmitReserve from '@/hooks/useSubmitReserve';
import { StyledReserveCalendarWrapper } from '@/styles/StyledReserveCalendar';
import CalendarModal from './CalendarModal';
import ReserveFormSkeleton from '../skeletonUI/activity/ReserveFormSkeleton';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const defaultReservedSchedules: AvailableReservationsType = {
  cursorId: 0,
  reservations: [],
  totalCount: 0,
};

const defaultAvailableSchedules: AvailableSchedulesType[] = [];

const ReserveForm = ({ price }: { price: number }) => {
  const { id } = useParams<{ id: string }>();
  const windowWidth = useWindowWidth();
  const { mutate } = useSubmitReserve(id || '');

  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [yearMonthDay, setYearMonthDay] = useState<string>('');
  const [attendeeCount, setAttendeeCount] = useState<number>(1);
  const [isReduceDisabled, setIsReduceDisabled] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(price);
  const [selectedTimeId, setSelectedTimeId] = useState<number>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // 예약 가능한 시간 데이터
  const {
    data: availableSchedules,
    isLoading: availableSchedulesLoading,
    isError: availableSchedulesError,
  } = useAvailableScheduleQuery(id || '', selectedDate);

  // 이미 예약된 시간 데이터
  const {
    data: reservedSchedules,
    isLoading: reservationLoading,
    isError: reservationError,
  } = useReservedScheduleQuery();

  // 예약 가능한 시간과, 이미 예약된 시간 데이터를 비교해서, 실제 예약 가능한 시간대를 알아내기
  const actualAvailableTimes = getAvailableTimes(
    reservedSchedules || defaultReservedSchedules,
    availableSchedules || defaultAvailableSchedules,
  );

  // 예약 가능한 날짜 배열
  const availableDates = useMemo(() => {
    if (!availableSchedules) return [];
    return actualAvailableTimes.map((date) => date.date);
  }, [availableSchedules, actualAvailableTimes]);

  // 예약 가능한 시간 className 지정
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && availableDates.includes(moment(date).format('YYYY-MM-DD'))) {
      return 'available';
    }
    return null;
  };

  const handleDateChange = (newDate: SelectedDate) => setSelectedDate(newDate);

  const handleReduceAttendee = () => setAttendeeCount((prev) => prev - 1);

  const handlePlusAttendee = () => setAttendeeCount((prev) => prev + 1);

  const handleSelectTime: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const timeId = event.currentTarget.getAttribute('data-time-id');
    setSelectedTimeId(Number(timeId));
    setSelectedTime(event.currentTarget.innerHTML);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedTimeId) {
        Toast.error('예약 가능한 시간을 선택해주세요.');
        return;
      }
      if (typeof id === 'string') {
        mutate(
          { selectedTimeId, attendeeCount, id },
          {
            onSuccess: () => {
              setAttendeeCount(1);
              Toast.success('예약이 되었습니다.');
            },
            onError: (error) => {
              Toast.error(error.message);
            },
          },
        );
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message.toString() || '예약 중 에러가 발생했습니다';
      Toast.error(errorMessage);
    }
  };

  const handleModalOpen = () => setModalIsOpen(true);

  useEffect(() => {
    const { selectedYMD } = getMonthAndYear(selectedDate);
    setYearMonthDay(selectedYMD);
  }, [selectedDate]);

  useEffect(() => {
    setIsReduceDisabled(attendeeCount < 2);
    setTotalPrice(price * attendeeCount);
  }, [attendeeCount]);

  if (availableSchedulesLoading || reservationLoading) {
    return <ReserveFormSkeleton />;
  }

  if (availableSchedulesError || reservationError) {
    return <div>예약 가능한 시간을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="w-full border-2 border-solid rounded-lg border-gray-30">
      <div className="flex flex-col gap-4 p-4">
        <div className="font-bold text-3xl md:text-xl dark:text-darkMode-white-10">
          {priceToWon(price)}
          <span className="font-normal text-xl md:text-base dark:text-darkMode-white-10">
            {' '}
            / 인
          </span>
        </div>
        <hr className="w-full h-[1px] bg-gray-40" />
        {/* 예약 현황 캘린더 */}
        <div className="font-bold text-xl dark:text-darkMode-white-10">날짜</div>
        {windowWidth > 1023 ? (
          <>
            <StyledReserveCalendarWrapper>
              <Calendar
                tileClassName={tileClassName}
                onChange={handleDateChange}
                value={selectedDate}
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
            <div className="font-bold text-lg dark:text-darkMode-white-10">예약 가능한 시간</div>
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
          </>
        ) : (
          <div className="relative">
            {!selectedTime ? (
              <div
                className="font-bold w-24 underline cursor-pointer dark:text-darkMode-white-20"
                onClick={handleModalOpen}
              >
                날짜 선택하기
              </div>
            ) : (
              <div
                className="font-bold w-full underline cursor-pointer dark:text-darkMode-white-30"
                onClick={handleModalOpen}
              >
                {`${yearMonthDay} ${selectedTime}`}
              </div>
            )}
            {modalIsOpen && (
              <CalendarModal
                setModalIsOpen={setModalIsOpen}
                handleDateChange={handleDateChange}
                tileClassName={tileClassName}
                handleSelectTime={handleSelectTime}
                selectedTimeId={selectedTimeId}
                actualAvailableTimes={actualAvailableTimes}
                yearMonthDay={yearMonthDay}
              />
            )}
          </div>
        )}

        <hr className="w-full h-[1px] bg-gray-40" />
        {/* 참여 인원 수 */}
        <div className="font-bold text-xl dark:text-darkMode-white-10">참여 인원 수</div>
        <div className="flex justify-between items-center w-[120px] border-2 border-gray border-solid bg-white rounded-lg text-black text-center text-4xl px-3 pb-1 dark:bg-darkMode-black-40 dark:text-darkMode-white-20">
          <button
            className={`${isReduceDisabled ? 'disabled:opacity-50' : ''}`}
            type="button"
            onClick={handleReduceAttendee}
            disabled={isReduceDisabled}
          >
            -
          </button>
          <div className="text-lg pt-1">{attendeeCount}</div>
          <button type="button" onClick={handlePlusAttendee}>
            +
          </button>
        </div>
        {/* 예약하기 버튼 */}
        <button
          type="submit"
          className="w-full bg-nomad-black rounded text-white text-center p-3 font-bold text-base dark:bg-darkMode-black-40"
          onClick={handleSubmit}
        >
          예약하기
        </button>
        <hr className="w-full h-[1px] bg-gray-40" />
        {/* 총 합계 가격 */}
        <div className="flex justify-between font-bold text-xl">
          <div className="dark:text-darkMode-white-10">총 합계</div>
          <div className="dark:text-darkMode-white-10">{priceToWon(totalPrice)}</div>
        </div>
      </div>
    </div>
  );
};

export default ReserveForm;
