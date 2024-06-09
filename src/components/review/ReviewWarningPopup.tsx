import { useEffect, useRef, useState } from 'react';
import { ReviewDuplicatePopupContent } from './StyledReviewDuplicatePopup';

interface ReviewDuplicatePopupProps {
  message: string;
  isVisible: boolean;
}

const ReviewDuplicatePopup: React.FC<ReviewDuplicatePopupProps> = ({ message, isVisible }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupWidth, setPopupWidth] = useState(0);

  useEffect(() => {
    if (popupRef.current) {
      setPopupWidth(popupRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="absolute bottom-[calc(100%+0.5rem)] left-1/2">
      <ReviewDuplicatePopupContent
        ref={popupRef}
        isVisible={isVisible}
        className={`bg-white rounded-full p-4 px-6 border-2 border-solid shadow-xl text-red-400 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } transform -translate-x-1/2 max-w-full whitespace-nowrap`}
      >
        {message}
      </ReviewDuplicatePopupContent>
    </div>
  );
};

export default ReviewDuplicatePopup;
