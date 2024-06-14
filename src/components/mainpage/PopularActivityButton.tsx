import { ReactComponent as LeftArrowBtn } from './assets/arrow_left.svg';
import { ReactComponent as RightArrowBtn } from './assets/arrow_right.svg';

interface PopularActivityButtonProps {
  idx: number;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const PopularActivityButton = ({ idx, onLeftClick, onRightClick }: PopularActivityButtonProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={onLeftClick}
        disabled={idx === 0}
        aria-label="Go to previous Activity"
      >
        <LeftArrowBtn stroke={idx === 0 ? '#A1A1A1' : '#4B4B4B'} />
      </button>
      <button
        type="button"
        onClick={onRightClick}
        disabled={idx === 8}
        aria-label="Go to next Activity"
      >
        <RightArrowBtn stroke={idx === 8 ? '#A1A1A1' : '#4B4B4B'} />
      </button>
    </div>
  );
};

export default PopularActivityButton;
