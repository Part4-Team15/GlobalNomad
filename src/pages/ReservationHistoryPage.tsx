import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import getMyReservation from '@/api/getMyReservation';
import ReservationContent from '@/components/myreservation/ReservationContent';
import { ActivityType } from '@/types/activityPage';
import ReviewModal from '../components/review/ReviewModal';
import ModalPortal from '../components/review/ModalPortal';

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

const ReservationHistoryPage = () => {
  const [status, setStatus] = useState<string>('');
  const { data } = useQuery({
    queryKey: ['reservation'],
    queryFn: getMyReservation,
  });

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

  return (
    <main className="md:flex-1">
      <ReservationContent status={status} setStatus={setStatus} onReviewClick={handleReviewClick} />
      <ModalPortal>
        <ReviewModal isOpen={isModalOpen} onClose={handleModalClose} booking={selectedBooking} />
      </ModalPortal>
    </main>
  );
};

export default ReservationHistoryPage;
