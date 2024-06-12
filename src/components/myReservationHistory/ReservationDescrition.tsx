import priceToWon from '@/utils/priceToWon';
import { ReservationDescriptionProps } from '@/types/myReservationHistory';

const ReservationDescription = ({
  title,
  status,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
  textColor,
  reservationStatusText,
  onReviewClick,
}: ReservationDescriptionProps) => (
  <div className="flex flex-col py-[25.5px] mr-6 flex-1 md:py-3 md:mr-[18px] sm:py-[9px] sm:mr-[14px]">
    <div className={`text-[${textColor}] font-bold mb-2 md:mb-0 sm:text-sm sm:mb-0`}>
      <p>{reservationStatusText}</p>
    </div>
    <h2 className="text-xl font-bold text-[#112211] mb-3 md:mb-1 md:text-lg sm:text-sm">{title}</h2>
    <div className="mb-4 text-[18px] text-[#112211] md:text-[14px] md:mb-[10px] sm:text-[12px] sm:mb-2">
      <p>
        {date} · {startTime} - {endTime} {headCount}명
      </p>
    </div>
    <div className="flex align-middle justify-between">
      <div className="text-[#1B1B1B] text-2xl font-bold py-[5px] md:text-[20px] sm:text-base sm:pt-0 sm:pb-[15px]">
        <p>{priceToWon(totalPrice)}</p>
      </div>
      {status === 'completed' && (
        <button
          type="button"
          onClick={onReviewClick}
          className="w-36 h-10 md:w-28 sm:w-20 sm:h-8 bg-[#121] text-white rounded-md sm:text-sm font-bold md:px-[24.51px] md:py-[8px] md:text-[16px] sm:px-[12px] sm:py-[4px]"
        >
          <p>후기 작성</p>
        </button>
      )}
      {status === 'pending' && (
        <button
          type="button"
          className="border-[1.5px] font-bold w-36 h-10 md:w-28 sm:w-20 sm:h-8 bg-white text-black border-black rounded-md sm:text-sm md:px-[24.51px] md:py-[8px] md:text-[16px] sm:px-[12px] sm:py-[4px]"
        >
          <p>예약 취소</p>
        </button>
      )}
    </div>
  </div>
);

export default ReservationDescription;
