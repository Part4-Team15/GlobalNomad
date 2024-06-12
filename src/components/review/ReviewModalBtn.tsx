import React from 'react';
import ReviewWarningPopup from './ReviewWarningPopup';

interface IProps {
  handleSubmit: () => void;
  showWarning: boolean;
  message: string;
}

const ReviewModalBtn = ({ handleSubmit, showWarning, message }: IProps) => {
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
