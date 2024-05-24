import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import '../../styles/tailwind-calendar.css';
import '../../styles/tailwind-calendar.css';

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
}

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const ReserveForm: React.FC<ReserveFormProps> = ({ activity }) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const { price } = activity;

  const handleDateChange = (newDate: SelectedDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="w-full">
      <div>₩{price} /인</div>
      <div>날짜</div>
      <Calendar
        className="react-calendar w-full"
        tileClassName="bg-gray-40"
        onChange={handleDateChange}
        value={selectedDate}
        calendarType="gregory"
        formatDay={(locale, date) => moment(date).format('D')}
        formatMonthYear={(locale, date) => moment(date).format('MMMM YYYY')}
        formatShortWeekday={(locale, date) => moment(date).format('ddd')}
        showNeighboringMonth={false}
        minDetail="month"
        minDate={new Date()}
        next2Label={null}
        prev2Label={null}
      />
      {/* Todo: 앞으로 구현 예정 @chaemin */}
      <div>예약 가능한 시간</div>
      <div>참여 인원 수</div>
      <div>예약하기 버튼</div>
      <div>총 합계 가격</div>
    </div>
  );
};

export default ReserveForm;
