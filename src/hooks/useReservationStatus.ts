import { useState, useEffect } from 'react';

interface ReservationStatus {
  textColor: string;
  reservationStatusText: string;
}

const useReservationStatus = (status: string): ReservationStatus => {
  const [reservationStatus, setReservationStatus] = useState<ReservationStatus>({
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

  return reservationStatus;
};

export default useReservationStatus;
