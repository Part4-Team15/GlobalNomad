import React, { useState } from 'react';
import Profile from '@/components/common/profile/Profile';
import { useQuery } from '@tanstack/react-query';
import getMyReservation from '@/api/getMyReservation';
import ReservationContent from '@/components/myreservation/ReservationContent';
import ReviewModal from '../components/review/ReviewModal';
import ModalPortal from '../components/review/ModalPortal';
import { ActivityType } from '@/types/activityPage';

interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: ActivityType;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

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

const ReservationsPage = () => {
  const [status, setStatus] = useState<string>('');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reservation'],
    queryFn: getMyReservation,
  });

  const reservations = data ? Object.values(data) : [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);

  const handleReviewClick = (bookingId: number) => {
    const booking = data?.reservations.find((b: Reservation) => b.id === bookingId);
    if (booking) {
      setSelectedBooking({
        id: booking.id,
        image: booking.activity.bannerImageUrl,
        title: booking.activity.title,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        people: booking.headCount,
        price: booking.totalPrice,
      });
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  if (isLoading) {
    return <div>예약 목록을 불러오고 있습니다...</div>;
  }

  if (isError || !data) {
    return <div>예약 목록을 불러오는데 실패했습니다</div>;
  }

  return (
    <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[65px]">
      <Profile />
      <ReservationContent status={status} setStatus={setStatus} onReviewClick={handleReviewClick} />
      <ModalPortal>
        <ReviewModal isOpen={isModalOpen} onClose={handleModalClose} booking={selectedBooking} />
      </ModalPortal>
    </div>
  );
};

export default ReservationsPage;
