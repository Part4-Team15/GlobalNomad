import React, { useEffect, useRef } from 'react';
import ModalBackground from './ModalBackground';
import ReviewForm from './ReviewForm';
import axios from 'axios';
import BookingHistory from './BookingHistory';

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

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (review: string, rating: number) => {
    try {
      if (booking) {
        await axios.post(`/my-reservations/${booking.id}/reviews`, {
          review,
          rating,
        });
        onClose();
      }
    } catch (error) {
      console.error('리뷰 제출 실패:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ModalBackground onClose={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="w-[30rem] h-[46.875rem] rounded-3xl bg-white pt-7 pr-6 pb-[2.875rem] pl-6"
          ref={modalRef}
        >
          <div className="w-full flex flex-col items-start gap-[2.5625rem]">
            <div className="w-full flex justify-between items-center">
              <p className="text-[1.75rem] font-bold leading-[1.625rem]">
                후기 작성
              </p>
              <button className="text-gray-80" onClick={onClose}>
                <img src="/assets/x_btn.svg" alt="xBtn" />
              </button>
            </div>
            {booking ? (
              <div>
                <BookingHistory booking={booking} />
                <ReviewForm onSubmit={handleSubmit} />
              </div>
            ) : (
              <div>예약 정보가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
