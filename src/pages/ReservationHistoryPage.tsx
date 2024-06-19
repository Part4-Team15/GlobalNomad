import React, { useState } from 'react';

import ReservationContent from '@/components/myReservationHistory/ReservationContent';
import { BookingData } from '@/types/myReservationHistory';
import ReviewModal from '../components/review/ReviewModal';
import ModalPortal from '../components/review/ModalPortal';

const ReservationHistoryPage = () => {
  const [status, setStatus] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);

  const handleReviewClick = ({
    id,
    bannerImageUrl,
    title,
    date,
    startTime,
    endTime,
    headCount,
    totalPrice,
  }: BookingData) => {
    setSelectedBooking({
      id,
      bannerImageUrl,
      title,
      date,
      startTime,
      endTime,
      headCount,
      totalPrice,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <main className="w-full">
      <ReservationContent status={status} setStatus={setStatus} onReviewClick={handleReviewClick} />
      <ModalPortal>
        <ReviewModal isOpen={isModalOpen} onClose={handleModalClose} booking={selectedBooking} />
      </ModalPortal>
    </main>
  );
};

export default ReservationHistoryPage;
