import React from 'react';
import ReviewDuplicatePopup from './ReviewDuplicatePopup';

interface IProps {
  handleSubmit: () => void;
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>;
  showWarning: boolean;
}

const ReviewModalBtn = ({ handleSubmit, setShowWarning, showWarning }: IProps) => {
  return (
    <div className="relative">
      <ReviewDuplicatePopup message="이미 작성된 후기가 있습니다." isVisible={showWarning} />
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
