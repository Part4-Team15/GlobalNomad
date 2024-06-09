import React, { useEffect, useRef, useState } from 'react';
import axios from '@/lib/axiosInstance';
import { isAxiosError } from 'axios';
import ModalBackground from './ModalBackground';
import ReviewForm from './ReviewForm';
import BookingHistory from './BookingHistory';
import useClickOutside from '@/hooks/useClickOutside';

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

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingData | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, booking }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showWarning, setShowWarning] = useState(false);

  useClickOutside(modalRef, onClose);

  const handleSubmit = async (content: string, rating: number) => {
    try {
      if (booking) {
        await axios.post(`/my-reservations/${booking.id}/reviews`, {
          rating,
          content,
        });
        onClose();
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          setShowWarning(true);
          setTimeout(() => {
            setShowWarning(false);
          }, 2000);
        } else {
          console.error('리뷰 제출 실패:', error);
        }
      } else {
        console.error('리뷰 제출 실패:', error);
      }
    }
  };

  const handleClick = (event: React.MouseEvent) => event.stopPropagation();

  if (!isOpen) return null;

  return (
    <ModalBackground onClose={onClose}>
      <div
        className="w-full h-full mob:w-[30rem] mob:h-[46.875rem] mob:rounded-3xl bg-white pt-7 pr-6 pb-[2.875rem] pl-6"
        ref={modalRef}
        onClick={handleClick}
      >
        <div className="w-full h-full flex flex-col items-start gap-[2.5625rem]">
          <div className="flex items-center justify-between w-full">
            <p className="text-[1.75rem] font-bold leading-[1.625rem]">후기 작성</p>
            <button type="button" className="text-gray-80" onClick={onClose}>
              <img src="/assets/x_btn.svg" alt="xBtn" />
            </button>
          </div>
          {booking ? (
            <div className="flex flex-col w-full h-full">
              <BookingHistory booking={booking} />
              <ReviewForm
                onSubmit={handleSubmit}
                showWarning={showWarning}
                setShowWarning={setShowWarning}
              />
            </div>
          ) : (
            <div>예약 정보가 없습니다.</div>
          )}
        </div>
      </div>
    </ModalBackground>
  );
};

export default ReviewModal;
