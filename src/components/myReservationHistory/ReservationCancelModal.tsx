import React, { useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import useCancelReservation from '@/hooks/useCancelReservation';
import ModalBackground from '../review/ModalBackground';

interface ReservationCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationId: number;
}

const ReservationCancelModal: React.FC<ReservationCancelModalProps> = ({
  isOpen,
  onClose,
  reservationId,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { mutate } = useCancelReservation();

  useClickOutside(modalRef, onClose);

  const handleDeleteClick = async () => {
    mutate(reservationId);
    onClose();
  };

  if (!isOpen) return null;

  const handleClick = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <ModalBackground onClose={onClose}>
      <div
        className="w-full h-full mob:w-[18.625rem] mob:h-[11.5rem] mob:rounded-xl bg-white p-6 dark:border-[1.5px] dark:border-green-80 dark:bg-darkMode-black-20 dark:text-darkMode-white-10"
        ref={modalRef}
        onClick={handleClick}
      >
        <div className="w-full h-full flex flex-col items-center gap-8">
          <div className="w-full flex flex-col items-center gap-4">
            <img src="/assets/footer_icon_check.svg" alt="checkcBtn" />
            <p className="leading-[1.625rem]">예약을 취소하시겠어요?</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-20 h-[2.375rem] flex justify-center items-center gap-2 py-[0.625rem] border border-[#121] rounded-md text-[0.875rem] dark:bg-green-80 dark:border-0"
              onClick={onClose}
            >
              아니오
            </button>
            <button
              type="button"
              className="w-20 h-[2.375rem] flex justify-center items-center gap-2 py-[0.625rem] rounded-md bg-[#121] text-white text-[0.875rem] dark:bg-green-10 dark:text-darkMode-black-20"
              onClick={handleDeleteClick}
            >
              취소하기
            </button>
          </div>
        </div>
      </div>
    </ModalBackground>
  );
};

export default ReservationCancelModal;
