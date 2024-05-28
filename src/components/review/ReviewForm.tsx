import React, { useState } from 'react';
import StarRating from './StarRating';

interface ReviewFormProps {
  onSubmit: (review: string, rating: number) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    onSubmit(review, rating);
    setReview('');
    setRating(0);
  };

  return (
    <div className="w-full">
      <StarRating onRatingChange={(value) => setRating(value)} />
      <textarea
        className="w-full h-[15rem] pt-2 pr-4 pb-2 pl-4 border border-gray-300 rounded mb-6 resize-none"
        placeholder="후기를 작성해주세요"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        type="button"
        className="w-full h-[3.5rem] justify-center items-center rounded-md bg-[#121] text-white"
        onClick={handleSubmit}
      >
        작성하기
      </button>
    </div>
  );
};

export default ReviewForm;
