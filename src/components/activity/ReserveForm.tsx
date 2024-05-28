import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axiosInstance from '@/lib/axiosInstance';
import getMonthAndYear from '@/utils/getMonthAndYear';
import '@/styles/tailwind-calendar.css';

interface Activity {
  title: string;
  category: string;
  rating: string;
  address: string;
  reviewCount: string;
  description: string;
  price: number;
}

interface ReserveFormProps {
  activity: Activity;
  id: string;
}

interface AvailableTimes {
  date: string;
  times: [
    {
      id: number;
      startTime: string;
      endTime: string;
    },
  ];
}

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const ReserveForm: React.FC<ReserveFormProps> = ({ activity, id }) => {
  const { price } = activity;
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [yearMonthDay, setYearMonthDay] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<AvailableTimes[] | null>(
    null,
  );
  const [attendeeCount, setAttendeeCount] = useState<number>(1);
  const [isReduceDisabled, setIsReduceDisabled] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(price);

  const handleDateChange = (newDate: SelectedDate) => {
    setSelectedDate(newDate);
  };

  const handleReduceAttendee = () => {
    setAttendeeCount((prev) => prev - 1);
  };

  const handlePlusAttendee = () => {
    setAttendeeCount((prev) => prev + 1);
  };

  useEffect(() => {
    const { selectedYMD, selectedYear, selectedMonth } =
      getMonthAndYear(selectedDate);
    setYearMonthDay(selectedYMD);
    const fetchAvailableTimes = async () => {
      try {
        const response = await axiosInstance.get(
          `/activities/${id}/available-schedule?year=${selectedYear}&month=${selectedMonth}`,
        );
        setAvailableTimes(response.data);
      } catch (error) {
        console.error('에러가 발생했습니다', error);
      }
    };
    fetchAvailableTimes();
  }, [selectedDate]);

  useEffect(() => {
    if (attendeeCount < 2) {
      setIsReduceDisabled(true);
    }
    if (attendeeCount >= 2) {
      setIsReduceDisabled(false);
    }
    setTotalPrice(price * attendeeCount);
  }, [attendeeCount]);

  return (
    <div className="w-full border-2 border-solid rounded-lg border-gray-30">
      <div className="flex flex-col gap-4 p-6">
        <div className="font-bold text-3xl">
          ₩{price.toLocaleString()}
          <span className="font-normal text-xl"> / 인</span>
        </div>
        <div className="w-full h-[1px] bg-gray-40" />
        <div className="font-bold text-xl">날짜</div>
        <Calendar
          className="react-calendar w-full"
          tileClassName=""
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
        <div className="font-bold text-lg">예약 가능한 시간</div>
        <div className="flex gap-2">
          {availableTimes?.map((availableTime) => {
            if (availableTime.date === yearMonthDay) {
              return availableTime.times.map((time) => {
                return (
                  <div
                    key={time.id}
                    className="w-1/3 bg-white border-2 border-solid border-nomad-black rounded-lg text-nomad-black text-center p-2.5
                    hover:bg-nomad-black hover:text-white"
                  >
                    {time.startTime}~{time.endTime}
                  </div>
                );
              });
            }
            return null;
          })}
        </div>
        <div className="w-full h-[1px] bg-gray-40" />
        <div className="font-bold text-xl">참여 인원 수</div>
        <div className="flex justify-between items-center w-1/3 border-2 border-gray border-solid bg-white rounded-lg text-black text-center text-4xl px-3">
          <button
            type="button"
            onClick={handleReduceAttendee}
            disabled={isReduceDisabled}
          >
            -
          </button>
          <div className="text-lg">{attendeeCount}</div>
          <button type="button" onClick={handlePlusAttendee}>
            +
          </button>
        </div>
        {/* 예약하기 버튼 */}
        <div className="w-full bg-nomad-black rounded text-white text-center p-3 font-bold text-base">
          예약하기
        </div>
        <div className="w-full h-[1px] bg-gray-40" />
        <div className="flex justify-between font-bold text-xl">
          <div>총 합계</div>
          <div>₩{totalPrice.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default ReserveForm;
