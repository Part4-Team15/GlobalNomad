import React, { useState } from 'react';
import StarRating from './StarRating';

interface ReviewFormProps {
  onSubmit: (review: string, rating: number) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    const trimmedContent = content.trim();
    if (trimmedContent) {
      onSubmit(trimmedContent, rating);
      setContent('');
      setRating(0);
    } else {
      alert('공백이 아닌 내용을 입력해주세요.');
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
