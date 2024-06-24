import React, { useRef, useState, useEffect } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import useSubmitReview from '@/hooks/useSubmitReview';
import { isAxiosError } from 'axios';
import { ReviewModalProps } from '@/types/reviewModal';
import ModalBackground from './ModalBackground';
import ReviewForm from './ReviewForm';
import BookingHistory from './BookingHistory';

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, booking }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);
  const [showWarning, setShowWarning] = useState(false);
  const [message, setMessage] = useState('');
  const { mutate } = useSubmitReview();

  const handleSubmit = (content: string, rating: number) => {
    if (!booking) return;
    mutate(
      { bookingId: booking.id, content, rating },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error: unknown) => {
          if (isAxiosError(error) && error.response?.status === 409) {
            setMessage('이미 작성된 후기가 있습니다.');
            setShowWarning(true);
          } else {
            console.error('리뷰 제출 실패:', error);
          }
        },
      },
    );
  };

  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 2000);

      // 클린업 함수 반환
      return () => clearTimeout(timer);
    }
    // showWarning이 false일 경우 undefined 반환
    return undefined;
  }, [showWarning]);
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();

  if (!isOpen) return null;

  return (
    <ModalBackground onClose={onClose}>
      <div
        className="w-full h-full mob:w-[30rem] mob:h-[46.875rem] mob:rounded-3xl bg-white pt-7 pr-6 pb-[2.875rem] pl-6 dark:border-[1.5px] dark:border-green-80 dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
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
                message={message}
                setMessage={setMessage}
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
