import priceToWon from '@/utils/priceToWon';
import React from 'react';

interface BookingData {
  id: number;
  image: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  people: number;
  price: number;
}

interface BookingHistoryProps {
  booking: BookingData;
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ booking }) => {
  return (
    <div className="flex items-center w-full gap-6 mb-6">
      <img
        src={booking.image}
        alt="Booking"
        className="w-[6.25rem] h-[6.25rem] mob:w-[7.875rem] mob:h-[7.875rem] rounded-[0.75rem]"
      />
      <div className="flex flex-col w-full justify-center items-start gap-3 font-Pretendard text-[#121]">
        <h2 className="text-[1.25rem] font-bold leading-[1.625rem]">
          {booking.title}
        </h2>
        <div className="flex items-center self-stretch gap-1 text-sm mob:gap-2 mob:text-base">
          <span className="leading-[1.5rem]">{booking.date}</span>
          <span className="leading-[1.625rem]">·</span>
          <span className="leading-[1.5rem]">
            {booking.startTime} - {booking.endTime}
          </span>
          <span className="leading-[1.625rem]">·</span>
          <span className="leading-[1.5rem]">{booking.people}명</span>
        </div>
        <div className="w-full h-[0.0625rem] bg-[#121] opacity-10" />
        <p className="text-2xl font-bold text-right">
          {priceToWon(booking.price)}
        </p>
      </div>
    </div>
  );
};

export default BookingHistory;
