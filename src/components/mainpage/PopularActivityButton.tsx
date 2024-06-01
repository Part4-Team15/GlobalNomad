interface PopularActivityButtonProps {
  onLeftClick: () => void;
  onRightClick: () => void;
}

const PopularActivityButton = ({ onLeftClick, onRightClick }: PopularActivityButtonProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={onLeftClick}
      >
        <img src="/assets/arrow_left.svg" alt="left Arrow Btn" />
      </button>
      <button
        type="button"
        onClick={onRightClick}
      >
        <img src="/assets/arrow_right.svg" alt="right Arrow Btn" />
      </button>
    </div>
  );
};

export default PopularActivityButton;
