import priceToWon from '@/utils/priceToWon';
import { useEffect, useState } from 'react';

interface ReservationItemProps {
  bannerImageUrl: string;
  title: string;
  status: string;
  date: string;
  totalPrice: number;
  headCount: number;
  startTime: string;
  endTime: string;
  id: number;
  onReviewClick: (id: number) => void;
}

const ReservationItem = ({
  title,
  bannerImageUrl,
  status,
  date,
  totalPrice,
  headCount,
  startTime,
  endTime,
  id,
  onReviewClick,
}: ReservationItemProps) => {
  const [reservationStatus, setReservationStatus] = useState({
    textColor: '',
    reservationStatusText: '',
  });

  const { textColor, reservationStatusText } = reservationStatus;

  const handleReviewClick = () => {
    onReviewClick(id);
  };

  console.log(status);
  useEffect(() => {
    switch (status) {
      case 'pending':
        setReservationStatus({
          textColor: '#2EB4FF',
          reservationStatusText: '예약 완료',
        });
        break;
      case 'confirmed':
        setReservationStatus({
          textColor: '#FF7C1D',
          reservationStatusText: '예약 승인',
        });
        break;
      case 'declined':
        setReservationStatus({
          textColor: '#FF472E',
          reservationStatusText: '예약 거절',
        });
        break;
      case 'canceled':
        setReservationStatus({
          textColor: '#79747E',
          reservationStatusText: '예약 취소',
        });
        break;
      case 'completed':
        setReservationStatus({
          textColor: '#79747E',
          reservationStatusText: '체험 완료',
        });
        break;
      default:
        setReservationStatus({
          textColor: '',
          reservationStatusText: '',
        });
        break;
    }
  }, [status]);

  // 추후에 삭제
  console.log(bannerImageUrl);
  const dateArr = date.split('-');
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const formatDate = `${year}. ${month.replace('0', '')}. ${day}`;
  return (
    <li className="flex rounded-3xl gap-6 overflow-hidden shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] bg-white md:h-[157px] md:gap-2 sm:h-[128px]">
      <img
        className="w-[204px] h-[204px] md:w-[157px] md:h-[157px] sm:w-[128px] sm:h-[128px]"
        src={`${bannerImageUrl}`}
        alt="activity_banner_image"
      />
      <div className="flex flex-col py-[25.5px] mr-6 flex-1 md:py-3 md:mr-[18px] sm:py-[9px] sm:mr-[14px]">
        <div className={`text-[${textColor}] font-bold mb-2 md:mb-0 sm:text-sm sm:mb-0`}>
          <p>{reservationStatusText}</p>
        </div>
        <h2 className="text-xl font-bold text-[#112211] mb-3 md:mb-1 md:text-lg sm:text-sm">
          {title}
        </h2>
        <div className="mb-4 text-[18px] text-[#112211] md:text-[14px] md:mb-[10px] sm:text-[12px] sm:mb-2">
          <p>
            {formatDate} · {startTime} - {endTime} {headCount}명
          </p>
        </div>
        <div className="flex align-middle justify-between">
          <div className="text-[#1B1B1B] text-2xl font-bold py-[5px] md:text-[20px] sm:text-base sm:pt-0 sm:pb-[15px]">
            <p>{priceToWon(totalPrice)}</p>
          </div>
          {status === 'completed' && (
            <button
              type="button"
              onClick={handleReviewClick}
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
    </li>
  );
};

export default ReservationItem;
