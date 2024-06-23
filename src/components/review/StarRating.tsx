import React, { useState } from 'react';
import { StarRatingProps } from '@/types/reviewModal';
import useStore from '@/hooks/useStore';

const StarRating: React.FC<StarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { darkMode } = useStore();

  const getStarIcon = (ratingValue: number) => {
    if (ratingValue <= (hover || rating)) {
      return 'star_on_icon.svg';
    }
    if (darkMode) {
      return 'star_off_icon_dark.svg';
    }
    return 'star_off_icon.svg';
  };

  return (
    <div className="h-[6.25rem] flex justify-around mob:justify-center items-center mb-6">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                onRatingChange(ratingValue);
              }}
              className="hidden text-green-10"
            />
            <img
              src={`/assets/${getStarIcon(ratingValue)}`}
              alt="star"
              className="cursor-pointer"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
