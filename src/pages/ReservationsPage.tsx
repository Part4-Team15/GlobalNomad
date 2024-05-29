import React, { useState } from 'react';
import Profile from '@/components/common/profile/Profile';
import { useQuery } from '@tanstack/react-query';
import getMyReservation from '@/api/getMyReservation';
import ReservationList from '@/components/myreservation/ReservationContent';
import ReservationContent from '@/components/myreservation/ReservationContent';
import ReviewModal from '../components/review/ReviewModal';
import ModalPortal from '../components/review/ModalPortal';

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
  // 임시데이터

  const { data, isLoading, isError } = useQuery({
    queryKey: ['reservation'],
    queryFn: getMyReservation,
  });

  const [bookings, setBookings] = useState<BookingData[]>([
    {
      id: 1,
      image: 'https://via.placeholder.com/150/FF0000',
      title: '예약 1',
      date: '2023-06-01',
      startTime: '10:00',
      endTime: '11:00',
      people: 2,
      price: 50000,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150/F0F0F0',
      title: '예약 2',
      date: '2023-06-15',
      startTime: '14:00',
      endTime: '15:00',
      people: 4,
      price: 100000,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
    null,
  );

  /* 후기 작성 버튼에 연결되도록 해야 함 */

  const handleReviewClick = (bookingId: number) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setIsModalOpen(true);
      setBookings([]); // 오류때문에 넣었음.
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };
  if (isLoading) {
    return <div>프로필을 불러오고 있습니다</div>;
  }

  if (isError || !data) {
    return <div>프로필을 불러오는데 실패했습니다</div>;
  }

  console.log(data);

  return (
    <div className="flex gap-6 justify-center bg-[#FAFAFA] pt-[65px]">
      <Profile />
      <ReservationContent />
      <ModalPortal>
        <ReviewModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          booking={selectedBooking}
        />
      </ModalPortal>
    </div>
  );
};

export default ReservationsPage;
