import { useEffect, useRef, useState } from 'react';
import { ReviewDWarningPopupProps } from '@/types/reviewModal';
import ReviewWarningPopupContent from './StyledReviewWarningPopup';

const ReviewWarningPopup: React.FC<ReviewDWarningPopupProps> = ({ message, isVisible }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupWidth, setPopupWidth] = useState(0);
  console.log(popupWidth);

  useEffect(() => {
    if (popupRef.current) {
      setPopupWidth(popupRef.current.offsetWidth);
    }
    console.log(popupWidth);
  }, []);

  return (
    <div className="absolute bottom-[calc(100%+0.5rem)] left-1/2">
      <ReviewWarningPopupContent
        ref={popupRef}
        isVisible={isVisible}
        className={`bg-white rounded-full p-4 px-6 border-2 border-solid shadow-xl text-red-400 dark:border-0 dark:bg-darkMode-black-20 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } transform -translate-x-1/2 max-w-full whitespace-nowrap`}
      >
        {message}
      </ReviewWarningPopupContent>
    </div>
  );
};

export default ReviewWarningPopup;
