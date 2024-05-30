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
}: ReservationItemProps) => {
  const [reservationStatus, setReservationStatus] = useState({
    textColor: '',
    reservationStatusText: '',
  });

  const { textColor, reservationStatusText } = reservationStatus;

  useEffect(() => {
    switch (status) {
      case 'pending':
        setReservationStatus({
          textColor: '#555555',
          reservationStatusText: '예약 신청',
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
  return (
    <div
      className="flex w-full rounded-3xl gap-6 overflow-hidden shadow-[0_4px_16px_0_rgba(17, 34, 17, 0.05);

    ]  bg-white "
    >
      <img
        className="w-[204px] h-[204px]"
        src="https://picsum.photos/200/300"
        alt="activity_banner_image"
      />
      <div className="flex flex-col py-[25.5px]">
        <div className={`text-${textColor} font-bold mb-2`}>
          {reservationStatusText}
        </div>
        <div className="text-xl font-bold text-[#121] mb-3">{title}</div>
        <div className="mb-4">
          {date} {startTime} - {endTime} {headCount}명
        </div>
        <div className="text-[#1b1b1b] text-2xl font-medium py-[5px]">
          ₩{totalPrice}원
        </div>
      </div>
    </div>
  );
};

export default ReservationItem;
