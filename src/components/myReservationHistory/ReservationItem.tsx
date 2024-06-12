import { useEffect, useState } from 'react';
import ReservationDescription from './ReservationDescrition';

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

  const dateArr = date.split('-');
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const formatDate = `${year}. ${month.replace(/^0/, '')}. ${day.replace(/^0/, '')}`;

  return (
    <li className="flex rounded-3xl gap-6 overflow-hidden shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] bg-white md:h-[157px] md:gap-2 sm:h-[128px]">
      <img
        className="w-[204px] h-[204px] md:w-[157px] md:h-[157px] sm:w-[128px] sm:h-[128px]"
        src={`${bannerImageUrl}`}
        alt="activity_banner_image"
      />
      <ReservationDescription
        title={title}
        status={status}
        date={formatDate}
        startTime={startTime}
        endTime={endTime}
        headCount={headCount}
        totalPrice={totalPrice}
        textColor={reservationStatus.textColor}
        reservationStatusText={reservationStatus.reservationStatusText}
        onReviewClick={() => onReviewClick(id)}
      />
    </li>
  );
};

export default ReservationItem;
