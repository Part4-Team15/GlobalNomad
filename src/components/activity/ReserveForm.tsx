import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Calendar from 'react-calendar';
import getMonthAndYear from '@/utils/getMonthAndYear';
import priceToWon from '@/utils/priceToWon';
import Toast from '@/utils/Toast';
import getAvailableTimes from '@/utils/getAvailableTimes';
import getAvailableSchdule from '@/api/getAvailableSchedule';
import getAllMyReservation from '@/api/getAllMyReservation';
import postActivityReservation from '@/api/postActivityReservation';
import queryKeys from '@/api/reactQuery/queryKeys';
import {
  ActivityType,
  AvailableReservationsType,
  AvailableSchedulesType,
} from '@/types/activityPage';
import useWindowWidth from '@/hooks/useWindowWidth';
import { StyledReserveCalendarWrapper } from '@/styles/StyledReserveCalendar';
import CalendarModal from './CalendarModal';

interface ReserveFormProps {
  activity: ActivityType;
}

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const ReserveForm: React.FC<ReserveFormProps> = ({ activity }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { price } = activity;
  const windowWidth = useWindowWidth();

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
  } = useQuery<AvailableSchedulesType[]>({
    queryKey: queryKeys.availableSchedules(id || ''),
    queryFn: () => {
      const { selectedYear, selectedMonth } = getMonthAndYear(selectedDate);
      return getAvailableSchdule({
        id: id!,
        selectedYear,
        selectedMonth,
      });
    },
    enabled: !!id,
  });

  // 이미 예약된 시간 데이터
  const {
    data: reservedSchedules,
    isLoading: reservationLoading,
    isError: reservationError,
  } = useQuery<AvailableReservationsType>({
    queryKey: queryKeys.reservedSchedules(),
    queryFn: getAllMyReservation,
  });

  // 기본값을 빈 객체로 설정
  const defaultReservedSchedules: AvailableReservationsType = {
    cursorId: 0,
    reservations: [],
    totalCount: 0,
  };

  // 기본값을 빈 배열로 설정
  const defaultAvailableSchedules: AvailableSchedulesType[] = [];

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
        await postActivityReservation({ selectedTimeId, attendeeCount, id });
        Toast.success('예약이 되었습니다.');
        navigate('/');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message.toString() || 'An error occureed';
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
    return <div>예약 가능한 시간을 불러오고 있습니다...</div>;
  }

  if (availableSchedulesError || reservationError) {
    return <div>예약 가능한 시간을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="w-full border-2 border-solid rounded-lg border-gray-30">
      <div className="flex flex-col gap-4 p-4">
        <div className="font-bold text-3xl md:text-xl">
          {priceToWon(price)}
          <span className="font-normal text-xl md:text-base"> / 인</span>
        </div>
        <div className="w-full h-[1px] bg-gray-40" />
        {/* 예약 현황 캘린더 */}
        <div className="font-bold text-xl">날짜</div>
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
          </>
        ) : (
          <div className="relative">
            {!selectedTime ? (
              <div className="font-bold w-24 underline cursor-pointer" onClick={handleModalOpen}>
                날짜 선택하기
              </div>
            ) : (
              <div className="font-bold w-full underline cursor-pointer" onClick={handleModalOpen}>
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

        <div className="w-full h-[1px] bg-gray-40" />
        {/* 참여 인원 수 */}
        <div className="font-bold text-xl">참여 인원 수</div>
        <div className="flex justify-between items-center w-[120px] border-2 border-gray border-solid bg-white rounded-lg text-black text-center text-4xl px-3 pb-1">
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
          className="w-full bg-nomad-black rounded text-white text-center p-3 font-bold text-base"
          onClick={handleSubmit}
        >
          예약하기
        </button>
        <div className="w-full h-[1px] bg-gray-40" />
        {/* 총 합계 가격 */}
        <div className="flex justify-between font-bold text-xl">
          <div>총 합계</div>
          <div>{priceToWon(totalPrice)}</div>
        </div>
      </div>
    </div>
  );
};

export default ReserveForm;
