import React, { useEffect, useRef } from 'react';
import axios from '@/lib/axiosInstance';
import ModalBackground from '../review/ModalBackground';

interface ExperienceDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
  onDelete: () => void;
}

const ExperienceDeleteModal: React.FC<ExperienceDeleteModalProps> = ({
  isOpen,
  onClose,
  activityId,
  onDelete,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/my-activities/${activityId}`);
      onClose();
      onDelete();
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  if (!isOpen) return null;

  const handleClick = (event: any) => event.stopPropagation();

  return (
    <ModalBackground onClose={onClose}>
      <div
        className="w-full h-full mob:w-[18.625rem] mob:h-[11.5rem] mob:rounded-xl bg-white p-6"
        ref={modalRef}
        onClick={handleClick}
      >
        <div className="w-full h-full flex flex-col items-center gap-8">
          <div className="w-full flex flex-col items-center gap-4">
            <img src="/assets/footer_icon_check.svg" alt="checkcBtn" />
            <p className="leading-[1.625rem]">삭제하시겠습니까?</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-20 h-[2.375rem] flex justify-center items-center gap-2 py-[0.625rem] border border-[#121] rounded-md text-[0.875rem]"
              onClick={onClose}
            >
              아니오
            </button>
            <button
              type="button"
              className="w-20 h-[2.375rem] flex justify-center items-center gap-2 py-[0.625rem] rounded-md bg-[#121] text-white text-[0.875rem]"
              onClick={handleDeleteClick}
            >
              예
            </button>
          </div>
        </div>
      </div>
    </ModalBackground>
  );
};

export default ExperienceDeleteModal;