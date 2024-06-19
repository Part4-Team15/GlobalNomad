import React from 'react';
import { ReviewModalBtnProps } from '@/types/reviewModal';
import ReviewWarningPopup from './ReviewWarningPopup';

const ReviewModalBtn = ({ handleSubmit, showWarning, message }: ReviewModalBtnProps) => {
  return (
    <div className="relative">
      <ReviewWarningPopup message={message} isVisible={showWarning} />
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full h-[3.5rem] justify-center items-center rounded-md bg-[#121] text-white"
      >
        작성하기
      </button>
    </div>
  );
};

export default ReviewModalBtn;
