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
        <LeftArrowBtn className={idx === 0 ? 'stroke-gray-60 dark:stroke-gray-80' : 'stroke-gray-80 dark:stroke-gray-60'} />
      </button>
      <button
        type="button"
        onClick={onRightClick}
        disabled={idx === 8}
        aria-label="Go to next Activity"
      >
        <RightArrowBtn className={idx === 8 ? 'stroke-gray-60 dark:stroke-gray-80' : 'stroke-gray-80 dark:stroke-gray-60'} />
      </button>
    </div>
  );
};

export default PopularActivityButton;
