import React, { useState } from 'react';
import StarRating from './StarRating';
import ReviewModalBtn from './ReviewModalBtn';

interface ReviewFormProps {
  onSubmit: (review: string, rating: number) => void;
  showWarning: boolean;
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  showWarning,
  setShowWarning,
  message,
  setMessage,
}) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    const trimmedContent = content.trim();
    if (trimmedContent) {
      onSubmit(trimmedContent, rating);
      setContent('');
      setRating(0);
    } else {
      setMessage('공백이 아닌 내용을 입력해주세요.');
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full flex flex-col flex-grow">
      <StarRating onRatingChange={(value) => setRating(value)} />
      <textarea
        className="w-full mob:h-[15rem] flex-grow pt-2 pr-4 pb-2 pl-4 border border-gray-300 rounded mb-6 resize-none"
        placeholder="후기를 작성해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ReviewModalBtn
        handleSubmit={handleSubmit}
        showWarning={showWarning}
        setShowWarning={setShowWarning}
        message={message}
      />
    </div>
  );
};

export default ReviewForm;
