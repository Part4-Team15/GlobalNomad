import { MouseEvent } from 'react';

const POPOVER_VALUES = [
  { buttonName: '가격 낮은 순', sortKey: 'price_asc' },
  { buttonName: '가격 높은 순', sortKey: 'price_desc' }
];

interface FilterPopoverProp {
  isOpen: boolean;
  onSetSort: (e: MouseEvent<HTMLButtonElement>) => void;
}

const FilterPopover = ({ isOpen, onSetSort }: FilterPopoverProp) => {
  return (
    <div
      style={{ display: isOpen ? 'block' : 'none' }}
      className="absolute top-[66px] flex flex-col text-green-80"
    >
      <button
        className="w-[127px] bg-white border border-gray-30 rounded-t-xl py-4 hover:bg-green-10"
        type="button"
        value={POPOVER_VALUES[0].sortKey}
        onClick={onSetSort}
      >
        {POPOVER_VALUES[0].buttonName}
      </button>
      <button
        className="w-[127px] bg-white border border-gray-30 rounded-b-xl py-4 hover:bg-green-10"
        type="button"
        value={POPOVER_VALUES[1].sortKey}
        onClick={onSetSort}
      >
        {POPOVER_VALUES[1].buttonName}
      </button>
    </div>
  );
};

export default FilterPopover;
