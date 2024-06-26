import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMonthAndYear from '@/utils/getMonthAndYear';
import priceToWon from '@/utils/priceToWon';
import Toast from '@/utils/Toast';
import getAvailableTimes from '@/utils/getAvailableTimes';
import useAvailableScheduleQuery from '@/hooks/useAvailableScheduleQuery';
import useReservedScheduleQuery from '@/hooks/useReservedScheduleQuery';
import useSubmitReserve from '@/hooks/useSubmitReserve';
import { AvailableReservationsType, AvailableSchedulesType } from '@/types/activityPage';
import MobileCalendarModal from './MobileCalendarModal';
import ReserveBarSkeleton from '../skeletonUI/activity/ReserveBarSkeleton';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const defaultAvailableReservations: AvailableReservationsType = {
  cursorId: 0,
  reservations: [],
  totalCount: 0,
};

const defaultAvailableSchedules: AvailableSchedulesType[] = [];

const ReserveBar = ({ price }: { price: number }) => {
  const { id } = useParams<{ id: string }>();
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
    reservedSchedules || defaultAvailableReservations,
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
    return <ReserveBarSkeleton />;
  }

  if (availableSchedulesError || reservationError) {
    return <div>예약 가능한 시간을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full border-2 border-solid border-gray-30 bg-white z-30 dark:bg-darkMode-black-20 dark:border-darkMode-black-10">
      <div className="flex justify-between p-4">
        <div className="w-[240px] flex flex-col">
          <div className="flex justify-between items-center gap-3">
            <div className="font-bold text-3xl md:text-xl sm:text-xl dark:text-darkMode-white-20">
              {priceToWon(totalPrice)}
            </div>
            {/* 참여 인원 수 */}
            <div className="flex justify-between items-center w-[100px] border-2 border-gray border-solid bg-white rounded-lg text-black text-center text-4xl px-3 dark:bg-darkMode-black-40 dark:text-darkMode-white-20">
              <button
                className={`${isReduceDisabled ? 'disabled:opacity-50' : ''} text-3xl`}
                type="button"
                onClick={handleReduceAttendee}
                disabled={isReduceDisabled}
              >
                -
              </button>
              <div className="text-lg pt-1">{attendeeCount}</div>
              <button className="text-3xl" type="button" onClick={handlePlusAttendee}>
                +
              </button>
            </div>
          </div>

          {/* 예약 현황 캘린더 */}
          {!selectedTime ? (
            <div
              className="font-bold w-24 underline cursor-pointer dark:text-darkMode-white-20"
              onClick={handleModalOpen}
            >
              날짜 선택하기
            </div>
          ) : (
            <div
              className="font-bold w-full underline cursor-pointer dark:text-darkMode-white-20"
              onClick={handleModalOpen}
            >
              {`${yearMonthDay} ${selectedTime}`}
            </div>
          )}
          {modalIsOpen && (
            <MobileCalendarModal
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
        {/* 예약하기 버튼 */}
        <button
          type="submit"
          className="w-1/3 h-auto bg-green-80 rounded-xl text-white text-center font-bold dark:bg-darkMode-black-40"
          onClick={handleSubmit}
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default ReserveBar;
